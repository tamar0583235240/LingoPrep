import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';

const MySwal = withReactContent(Swal);

export function openSwalForm({
  title,
  defaultValue,
  onSubmit,
  FormComponent,
}: {
  title: string;
  defaultValue?: string;
  onSubmit: (content: string) => void;
  FormComponent: React.FC<{ defaultValue?: string; onSubmit: (content: string) => void }>;
}) {
  MySwal.fire({
    title,
    html: '<div id="swal-form"></div>',
    didOpen: () => {
      const container = document.getElementById('swal-form');
      if (container) {
        const root = createRoot(container);
        root.render(<FormComponent defaultValue={defaultValue} onSubmit={onSubmit} />);
      }
    },
    showConfirmButton: false,
    showCloseButton: true,
  });
}
