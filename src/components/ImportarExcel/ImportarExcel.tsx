import { useRef } from 'react';
import * as XLSX from 'xlsx';
import './ImportarExcel.css';
import { importarCodigosDesdeExcel } from '@/services/admin-sheets';
import Swal from 'sweetalert2';

const ImportarExcel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      const codigos = json
        .map((row: any) => row.codigo?.toString().trim())
        .filter((codigo: string | undefined) => !!codigo);

      if (codigos.length === 0) {
        Swal.fire('Archivo vacío', 'No se encontraron códigos válidos', 'warning');
        return;
      }

      try {
        await importarCodigosDesdeExcel(codigos);
        Swal.fire('Éxito', `${codigos.length} códigos fueron importados`, 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'No se pudieron importar los códigos', 'error');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="importar-excel-wrapper">
      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="importar-input"
      />
      <button
        className="importar-btn"
        onClick={() => fileInputRef.current?.click()}
      >
        📥 Importar Códigos desde Excel
      </button>
    </div>
  );
};

export default ImportarExcel;
