// Utils.js - Funções utilitárias
import { saveGeradores } from './firebase.js';

export function exportData() {
  const geradores = window.appState?.geradores || [];
  if (!geradores.length) return;
  
  const dataStr = JSON.stringify(geradores, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `geradores_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importData(event, onSuccess) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        await saveGeradores(imported);
        if (onSuccess) onSuccess(imported);
        alert('Dados importados com sucesso!');
      }
    } catch (err) { alert('Erro ao importar.'); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

export async function saveRecord(e) {
  e.preventDefault();
  const geradores = window.appState?.geradores || [];
  
  const id = document.getElementById('editId').value;
  const data = {
    tipo: document.getElementById('editTipo').value,
    local: document.getElementById('editLocal').value,
    endereco: document.getElementById('editEndereco').value,
    tagVale: document.getElementById('editTagVale').value,
    tagFornecedor: document.getElementById('editTagFornecedor').value,
    chassi: document.getElementById('editChassi').value,
    status: document.getElementById('editStatus').value,
    automacao: document.getElementById('editAuto').value,
    nivel: document.getElementById('editNivel').value,
    fornecedor: document.getElementById('editFornecedor').value,
    tipoChassis: document.getElementById('editTipoChassis').value,
    dentroMina: document.getElementById('editDentroMina').value === 'true'
  };

  let newGeradores;
  if (id) {
    const index = geradores.findIndex(g => g.id == id);
    if (index !== -1) {
      newGeradores = [...geradores];
      newGeradores[index] = { ...geradores[index], ...data };
    }
  } else {
    const newId = Math.max(...geradores.map(g => g.id), 0) + 1;
    newGeradores = [...geradores, { id: newId, ...data }];
  }

  await saveGeradores(newGeradores);
  window.closeModal();
  window.appState.geradores = newGeradores;
  window.renderCards();
  window.updateStats();
}