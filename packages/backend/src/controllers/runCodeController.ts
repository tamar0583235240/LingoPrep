import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { pool } from '../config/dbConnection';


const tempDir = path.join(process.cwd(), 'temp_code');
const csharpProjectDir = path.join(tempDir, 'temp_code_csharp');

function clearTempDir() {
  if (!fs.existsSync(tempDir)) return;

  const files = fs.readdirSync(tempDir);
  for (const file of files) {
    if (file === 'temp_code_csharp') continue;
    const filePath = path.join(tempDir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
}

function prepareCSharpProject() {
  if (!fs.existsSync(csharpProjectDir)) {
    fs.mkdirSync(csharpProjectDir);
  }

  const csprojPath = path.join(csharpProjectDir, 'temp_code_csharp.csproj');
  if (!fs.existsSync(csprojPath)) {
    fs.writeFileSync(csprojPath, `
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
</Project>
    `.trim());
  }
}

export const writeTempFile = (dir: string, fileName: string, code: string): string => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

const execCommand = (command: string, cwd: string, res: Response) => {
  console.log('מריץ פקודה:', command, 'בתיקייה:', cwd);
  exec(command, { cwd }, (error, stdout, stderr) => {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (error) {
      console.log('שגיאה בהרצה:', stderr || error.message);
      return res.json({ success: false, error: stderr || error.message });
    }
    res.json({ success: true, output: stdout });
  });
};


export const runCodeController = async (req: Request, res: Response) => {
  const { language, code } = req.body;
  if (!language || !code) {
    return res.status(400).json({ message: 'שפת תכנות או קוד חסרים' });
  }

  console.log('runCodeController activated');
  console.log('language:', req.body.language);
  console.log('code:', req.body.code);

  clearTempDir();

  switch (language.toLowerCase()) {
    case 'java':
      writeTempFile(tempDir, 'Main.java', code);
      execCommand('javac Main.java && java Main', tempDir, res);
      break;

    case 'python':
      writeTempFile(tempDir, 'script.py', code);
      // execCommand('python3 script.py', tempDir, res);
      // execCommand('python script.py', tempDir, res);
      execCommand('"C:/Users/user1/AppData/Local/Programs/Python/Python313/python.exe" script.py', tempDir, res);
      break;

    case 'csharp':
      prepareCSharpProject();
      writeTempFile(csharpProjectDir, 'Program.cs', code);
      execCommand('dotnet run --project .', csharpProjectDir, res);
      break;

    case 'c':
      writeTempFile(tempDir, 'main.c', code);
      execCommand('C:/MinGW/bin/gcc main.c -o main.exe && main.exe', tempDir, res);
      break;

    case 'cpp':
    case 'c++':
      writeTempFile(tempDir, 'main.cpp', code);
      execCommand('C:/MinGW/bin/g++ main.cpp -o main.exe && main.exe', tempDir, res);
      break;

    case 'html':
      const htmlContent = code; // הקוד עצמו הוא התוכן
      res.json({ success: true, output: htmlContent });
      break;

case 'javascript':
  writeTempFile(tempDir, 'script.js', code);
  execCommand('node script.js', tempDir, res);
  break;

    case 'sql':
      try {
        const unsafe = /(drop|delete|update|insert)/i.test(code);
        if (unsafe) {
          return res.json({ success: false, error: 'פקודות הרסניות לא נתמכות בהרצת SQL' });
        }
        const result = await pool.query(code);
        res.json({ success: true, output: result.rows });
      } catch (err: any) {
        res.json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ message: `שפה ${language} לא נתמכת` });
  }
};
