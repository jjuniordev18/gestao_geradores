// App.js - Lógica principal otimizada para menor consumo
import { saveGeradores } from './firebase.js';

let isAdmin = false;
let charts = {};

export function initApp() {
  setupTheme();
}

function setupTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

export function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

export function toggleAdmin() {
  if (isAdmin) {
    isAdmin = false;
    updateAdminButton(false);
  } else {
    document.getElementById('loginModal').classList.remove('hidden');
  }
  renderCards();
}

export function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  
  if (user === 'admin' && pass === 'admin') {
    isAdmin = true;
    closeLoginModal();
    updateAdminButton(true);
    renderCards();
  } else {
    alert('Credenciais inválidas!');
  }
}

function updateAdminButton(loggedIn) {
  const btn = document.getElementById('adminBtn');
  if (loggedIn) {
    btn.innerHTML = '<i class="fas fa-unlock"></i><span class="hidden sm:inline">Logout</span>';
    btn.classList.remove('bg-primary-600', 'hover:bg-primary-700');
    btn.classList.add('bg-red-600', 'hover:bg-red-700');
  } else {
    btn.innerHTML = '<i class="fas fa-lock"></i><span class="hidden sm:inline">Admin</span>';
    btn.classList.remove('bg-red-600', 'hover:bg-red-700');
    btn.classList.add('bg-primary-600', 'hover:bg-primary-700');
  }
}

export function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

export function renderCards() {
  const container = document.getElementById('cardsContainer');
  const geradores = window.appState?.geradores || [];
  const filters = getFilters();
  const searchText = (filters.search || '').toLowerCase();

  const filtered = geradores.filter(g => {
    if (filters.status && g.status !== filters.status) return false;
    if (filters.auto && g.automacao !== filters.auto) return false;
    if (filters.fornecedor && g.fornecedor !== filters.fornecedor) return false;
    if (filters.nivel && g.nivel !== filters.nivel) return false;
    if (searchText) {
      const searchFields = [g.local, g.endereco, g.tagVale, g.tagFornecedor, g.chassi, g.fornecedor, g.tipo, g.status].join(' ').toLowerCase();
      if (!searchFields.includes(searchText)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    document.getElementById('emptyState').classList.remove('hidden');
    return;
  }

  document.getElementById('emptyState').classList.add('hidden');
  container.innerHTML = filtered.map(createCard).join('');
}

function createCard(g) {
  const statusColors = { 'OPERACIONAL': 'bg-emerald-500', 'INDISPONIVEL': 'bg-red-500', 'N/A': 'bg-slate-400' };
  const autoColors = { 'OK': 'text-emerald-600 bg-emerald-50', 'NOK': 'text-red-600 bg-red-50', 'N/A': 'text-slate-600 bg-slate-100' };
  const nivelColors = { '1/4': 'text-orange-600', '2/4': 'text-yellow-600', '3/4': 'text-blue-600', 'Cheio': 'text-emerald-600', 'N/A': 'text-slate-600' };
  const editButton = isAdmin ? `<button onclick="editRecord(${g.id})" class="p-2 rounded-lg bg-primary-100 text-primary-600"><i class="fas fa-edit"></i></button>` : '';

  return `<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden card-hover animate-fade-in">
    <div class="h-2 ${statusColors[g.status]}"></div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl ${getTipoColor(g.tipo)} flex items-center justify-center text-white">
            <i class="fas ${getTipoIcon(g.tipo)} text-xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-lg text-slate-800 dark:text-white">${g.local}</h3>
            <p class="text-sm text-slate-500">${g.tipo} • ${g.endereco}</p>
          </div>
        </div>
        ${editButton}
      </div>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-500">Status</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[g.status]}">${g.status}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-500">Automação</span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${autoColors[g.automacao]}">${g.automacao}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-500">Nível</span>
          <span class="text-sm font-bold ${nivelColors[g.nivel]}">${g.nivel}</span>
        </div>
        <div class="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div class="flex justify-between text-sm"><span class="text-slate-500">Chassi:</span><span class="font-mono">${g.chassi}</span></div>
          <div class="flex justify-between text-sm"><span class="text-slate-500">TAG VALE:</span><span class="font-mono">${g.tagVale}</span></div>
          <div class="flex justify-between text-sm"><span class="text-slate-500">Fornecedor:</span><span>${g.fornecedor}</span></div>
          <div class="flex justify-between text-sm"><span class="text-slate-500">Localização:</span><span class="${g.dentroMina ? 'text-purple-600' : 'text-blue-600'}">${g.dentroMina ? 'Dentro da Mina' : 'Fora da Mina'}</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

function getTipoColor(tipo) {
  const colors = { 'TORRE': 'bg-gradient-to-br from-blue-500 to-blue-600', 'POSTE': 'bg-gradient-to-br from-pink-500 to-pink-600', 'SKID': 'bg-gradient-to-br from-orange-500 to-orange-600', 'CENTRAL': 'bg-gradient-to-br from-cyan-500 to-cyan-600', 'REPETIDORA': 'bg-gradient-to-br from-purple-500 to-purple-600' };
  return colors[tipo] || 'bg-gradient-to-br from-slate-500 to-slate-600';
}

function getTipoIcon(tipo) {
  const icons = { 'TORRE': 'fa-tower-broadcast', 'POSTE': 'fa-lightbulb', 'SKID': 'fa-box', 'CENTRAL': 'fa-server', 'REPETIDORA': 'fa-broadcast-tower' };
  return icons[tipo] || 'fa-server';
}

export function updateStats() {
  const geradores = window.appState?.geradores || [];
  const total = geradores.length;
  const operacional = geradores.filter(g => g.status === 'OPERACIONAL').length;
  const autoOk = geradores.filter(g => g.automacao === 'OK').length;
  const indisponivel = geradores.filter(g => g.status === 'INDISPONIVEL').length;
  const torres = geradores.filter(g => g.tipo === 'TORRE').length;
  const postes = geradores.filter(g => g.tipo === 'POSTE').length;
  const niveisNumeric = { '1/4': 0.25, '2/4': 0.5, '3/4': 0.75, 'Cheio': 1, 'N/A': 0 };
  const nivelMedio = geradores.reduce((acc, g) => acc + (niveisNumeric[g.nivel] || 0), 0) / (total || 1) * 100;

  document.getElementById('totalCount').textContent = total;
  document.getElementById('operacionalCount').textContent = operacional;
  document.getElementById('operacionalPercent').textContent = total ? ((operacional / total) * 100).toFixed(1) + '%' : '0%';
  document.getElementById('autoOkCount').textContent = autoOk;
  document.getElementById('autoOkPercent').textContent = total ? ((autoOk / total) * 100).toFixed(1) + '%' : '0%';
  document.getElementById('nivelMedio').textContent = nivelMedio.toFixed(1) + '%';
  document.getElementById('indisponivelCount').textContent = indisponivel;
  document.getElementById('torreCount').textContent = torres;
  document.getElementById('posteCount').textContent = postes;

  updateCharts(operacional, total, autoOk);
}

export function initCharts() {
  const geradores = window.appState?.geradores || [];
  const total = geradores.length;
  const operacional = geradores.filter(g => g.status === 'OPERACIONAL').length;
  const autoOk = geradores.filter(g => g.automacao === 'OK').length;

  charts.total = new Chart(document.getElementById('totalChart'), {
    type: 'bar',
    data: { labels: ['Total'], datasets: [{ data: [total], backgroundColor: ['#3b82f6'], borderRadius: 8 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }
  });

  charts.operacional = new Chart(document.getElementById('operacionalChart'), {
    type: 'doughnut',
    data: { labels: ['Operacional', 'Outros'], datasets: [{ data: [operacional, total - operacional], backgroundColor: ['#10b981', '#e2e8f0'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
  });

  charts.auto = new Chart(document.getElementById('autoChart'), {
    type: 'doughnut',
    data: { labels: ['OK', 'Outros'], datasets: [{ data: [autoOk, total - autoOk], backgroundColor: ['#8b5cf6', '#e2e8f0'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }
  });
}

function updateCharts(operacional, total, autoOk) {
  if (charts.total) { charts.total.data.datasets[0].data = [total]; charts.total.update(); }
  if (charts.operacional) { charts.operacional.data.datasets[0].data = [operacional, total - operacional]; charts.operacional.update(); }
  if (charts.auto) { charts.auto.data.datasets[0].data = [autoOk, total - autoOk]; charts.auto.update(); }
}

export function getFilters() {
  return {
    status: document.getElementById('filterStatus').value,
    auto: document.getElementById('filterAuto').value,
    fornecedor: document.getElementById('filterFornecedor').value,
    nivel: document.getElementById('filterNivel').value,
    search: document.getElementById('searchText').value
  };
}

export function applyFilters() { renderCards(); }

export function clearFilters() {
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterAuto').value = '';
  document.getElementById('filterFornecedor').value = '';
  document.getElementById('filterNivel').value = '';
  document.getElementById('searchText').value = '';
  renderCards();
}

export function filterByStatus(status) { document.getElementById('filterStatus').value = status; renderCards(); }
export function filterByAuto(auto) { document.getElementById('filterAuto').value = auto; renderCards(); }

export function editRecord(id) {
  if (!isAdmin) return;
  const geradores = window.appState?.geradores || [];
  const g = geradores.find(x => x.id === id);
  if (!g) return;
  
  document.getElementById('editId').value = g.id;
  document.getElementById('editTipo').value = g.tipo;
  document.getElementById('editLocal').value = g.local;
  document.getElementById('editEndereco').value = g.endereco;
  document.getElementById('editTagVale').value = g.tagVale;
  document.getElementById('editTagFornecedor').value = g.tagFornecedor;
  document.getElementById('editChassi').value = g.chassi;
  document.getElementById('editStatus').value = g.status;
  document.getElementById('editAuto').value = g.automacao;
  document.getElementById('editNivel').value = g.nivel;
  document.getElementById('editFornecedor').value = g.fornecedor;
  document.getElementById('editTipoChassis').value = g.tipoChassis;
  document.getElementById('editDentroMina').value = String(g.dentroMina);
  document.getElementById('editModal').classList.remove('hidden');
}

export function openModal() {
  if (!isAdmin) { alert('Modo admin necessário'); return; }
  document.getElementById('editForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('editModal').classList.remove('hidden');
}

export function closeModal() { document.getElementById('editModal').classList.add('hidden'); }