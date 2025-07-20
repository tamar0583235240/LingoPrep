import { useDynamicContents } from '../../dynamicContent/hooks/useDynamicContents';

export const useDynamicTitles = () => {
  const { contents, loading, error } = useDynamicContents();

  const titles: { [key: string]: string } = {};
  contents.forEach(item => {
    titles[item.key_name] = item.content;
  });

  return { titles, loading, error };
};
