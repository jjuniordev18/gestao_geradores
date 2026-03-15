import { getDb, DB_KEY, getFirebaseConfig } from './env.js';

const firebaseConfig = getFirebaseConfig();

export const defaultGeradores = [
  { id: 1, tipo: 'TORRE', local: 'TORRE SUL', endereco: 'TRV11-PA', tagVale: 'GE7228', tagFornecedor: 'A055428S', chassi: 'A055428S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'A GERADORA', nivel: '2/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 2, tipo: 'TORRE', local: 'N4WN1', endereco: 'TRV41-PA', tagVale: 'GE0703', tagFornecedor: 'A0557085S', chassi: 'A0557085S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'A GERADORA', nivel: '3/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 3, tipo: 'TORRE', local: 'CCO', endereco: 'TRV91-PA', tagVale: 'REDEL', tagFornecedor: 'Indisponivel', chassi: 'N/A', status: 'N/A', automacao: 'N/A', fornecedor: 'REDEL', nivel: 'N/A', tipoChassis: 'FIXO', dentroMina: false },
  { id: 4, tipo: 'TORRE', local: 'N4E', endereco: 'TRV31-PA', tagVale: 'GE0738', tagFornecedor: 'À Validar', chassi: 'À Validar', status: 'OPERACIONAL', automacao: 'NOK', fornecedor: 'A GERADORA', nivel: '1/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 5, tipo: 'TORRE', local: 'N4WN2', endereco: 'TRV51-PA', tagVale: 'GE0705', tagFornecedor: 'A0557045S', chassi: 'A0557045S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'A GERADORA', nivel: 'Cheio', tipoChassis: 'FIXO', dentroMina: true },
  { id: 6, tipo: 'TORRE', local: 'N4WSUL', endereco: 'TRV61-PA', tagVale: 'GE5770', tagFornecedor: 'A0557709S', chassi: 'A0557709S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'ALCON', nivel: '2/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 7, tipo: 'TORRE', local: 'N5SUL', endereco: 'TRVC1-PA', tagVale: 'GE0181', tagFornecedor: 'A055420S', chassi: 'A055420S', status: 'OPERACIONAL', automacao: 'NOK', fornecedor: 'A GERADORA', nivel: '3/4', tipoChassis: 'FIXO', dentroMina: false },
  { id: 8, tipo: 'TORRE', local: 'N5CC1', endereco: 'TRVB1-PA', tagVale: 'GE0118', tagFornecedor: 'A055277C', chassi: 'A055277C', status: 'OPERACIONAL', automacao: 'N/A', fornecedor: 'A GERADORA', nivel: '1/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 9, tipo: 'TORRE', local: 'CMD', endereco: 'CMD-LTE', tagVale: 'GE9607', tagFornecedor: 'A055504C', chassi: 'A055504C', status: 'OPERACIONAL', automacao: 'OPERACIONAL', fornecedor: 'A GERADORA', nivel: '2/4', tipoChassis: 'FIXO', dentroMina: false },
  { id: 10, tipo: 'TORRE', local: 'USINA +40', endereco: 'TRVA1-PA', tagVale: 'GE0061', tagFornecedor: 'A0557695S', chassi: 'A0557695S', status: 'OPERACIONAL', automacao: 'NOK', fornecedor: 'A GERADORA', nivel: '3/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 11, tipo: 'TORRE', local: 'MORRO1', endereco: 'TRVN1-PA', tagVale: 'GE3562', tagFornecedor: 'A055576S', chassi: 'A055576S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'VALE', nivel: 'Cheio', tipoChassis: 'FIXO', dentroMina: false },
  { id: 12, tipo: 'TORRE', local: 'GELADO', endereco: 'TRVZ1-PA', tagVale: 'GE0125', tagFornecedor: 'Indisponivel', chassi: 'Indisponivel', status: 'INDISPONIVEL', automacao: 'N/A', fornecedor: 'ALCON', nivel: 'N/A', tipoChassis: 'FIXO', dentroMina: true },
  { id: 13, tipo: 'TORRE', local: 'MANGANÊS', endereco: 'PORTARIA', tagVale: 'GE0145', tagFornecedor: 'Indisponivel', chassi: 'Indisponivel', status: 'INDISPONIVEL', automacao: 'N/A', fornecedor: 'ALCON', nivel: 'N/A', tipoChassis: 'FIXO', dentroMina: false },
  { id: 14, tipo: 'TORRE', local: 'MANGANÊS', endereco: 'MINA', tagVale: 'GE0232', tagFornecedor: 'Indisponivel', chassi: 'Indisponivel', status: 'INDISPONIVEL', automacao: 'N/A', fornecedor: 'INFRATECH', nivel: 'N/A', tipoChassis: 'MÓVEL', dentroMina: true },
  { id: 15, tipo: 'POSTE', local: 'N4E-EN', endereco: 'TRVO1-PA', tagVale: 'À Validar', tagFornecedor: 'Não Aplicável', chassi: 'N/A', status: 'OPERACIONAL', automacao: 'N/A', fornecedor: 'N/A', nivel: 'N/A', tipoChassis: 'N/A', dentroMina: true },
  { id: 16, tipo: 'POSTE', local: 'N5EN', endereco: 'TRVP1-PA', tagVale: 'SE1810 (furtado)', tagFornecedor: 'Não Há GMG', chassi: 'N/A', status: 'INDISPONIVEL', automacao: 'N/A', fornecedor: 'N/A', nivel: 'N/A', tipoChassis: 'N/A', dentroMina: false },
  { id: 17, tipo: 'POSTE', local: 'PDE NW2', endereco: 'TRV81-PA', tagVale: 'N/A', tagFornecedor: 'Indisponivel', chassi: 'Indisponivel', status: 'INDISPONIVEL', automacao: 'N/A', fornecedor: 'N/A', nivel: 'N/A', tipoChassis: 'N/A', dentroMina: true },
  { id: 18, tipo: 'POSTE', local: 'CAVA 04', endereco: 'TRVS1-PA', tagVale: 'GE0854', tagFornecedor: 'A022120S', chassi: 'A022120S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'A GERADORA', nivel: '2/4', tipoChassis: 'FIXO', dentroMina: true },
  { id: 19, tipo: 'SKID', local: 'COW SUL3', endereco: 'TRV71-PA', tagVale: 'GE0348', tagFornecedor: 'À Validar', chassi: 'À Validar', status: 'OPERACIONAL', automacao: 'NOK', fornecedor: 'A GERADORA', nivel: '1/4', tipoChassis: 'FIXO', dentroMina: false },
  { id: 20, tipo: 'SKID', local: 'CAVA 03', endereco: 'TRVJ1-PA', tagVale: 'N/A', tagFornecedor: 'Não Há GMG', chassi: 'N/A', status: 'N/A', automacao: 'N/A', fornecedor: 'N/A', nivel: 'N/A', tipoChassis: 'N/A', dentroMina: true },
  { id: 21, tipo: 'SKID', local: 'CAVA 02', endereco: 'TRVD1-PA', tagVale: 'GE0856', tagFornecedor: 'A015015S', chassi: 'A015015S', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'VALE', nivel: '3/4', tipoChassis: 'MÓVEL', dentroMina: true },
  { id: 22, tipo: 'CENTRAL', local: 'DATA CENTER', endereco: 'T-LEVE', tagVale: 'GE0138', tagFornecedor: 'À Validar', chassi: 'À Validar', status: 'OPERACIONAL', automacao: 'OK', fornecedor: 'VALE', nivel: 'Cheio', tipoChassis: 'FIXO', dentroMina: false },
  { id: 23, tipo: 'REPETIDORA', local: 'SHELTER CV02', endereco: 'EST. MANG.', tagVale: 'N/A', tagFornecedor: 'Não Há GMG', chassi: 'N/A', status: 'N/A', automacao: 'N/A', fornecedor: 'VALE', nivel: 'N/A', tipoChassis: 'MÓVEL', dentroMina: false }
];

let cachedGeradores = null;

export async function loadGeradores() {
  try {
    const db = await getDb();
    const { get, ref, set } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js');
    const snapshot = await get(ref(db, DB_KEY));
    
    if (snapshot.exists()) {
      cachedGeradores = snapshot.val();
      return cachedGeradores;
    } else {
      await set(ref(db, DB_KEY), defaultGeradores);
      cachedGeradores = defaultGeradores;
      return defaultGeradores;
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return cachedGeradores || defaultGeradores;
  }
}

export async function saveGeradores(data) {
  try {
    const db = await getDb();
    const { set, ref } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js');
    await set(ref(db, DB_KEY), data);
    cachedGeradores = data;
    return true;
  } catch (error) {
    console.error('Erro ao salvar:', error);
    return false;
  }
}

let unsubscribeCallback = null;
let isListening = false;

export function subscribeGeradores(callback) {
  unsubscribeCallback = callback;
  return () => { unsubscribeCallback = null; };
}

export async function initRealtimeSync() {
  if (isListening) return;
  
  try {
    const db = await getDb();
    const { onValue, ref } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js');
    const reference = ref(db, DB_KEY);
    
    isListening = true;
    onValue(reference, (snapshot) => {
      if (snapshot.exists() && unsubscribeCallback) {
        cachedGeradores = snapshot.val();
        unsubscribeCallback(cachedGeradores);
      }
    });
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}