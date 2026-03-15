// ⚠️ NOTA DE SEGURANÇA: 
// As chaves abaixo são de uso público (client-side) e são sempre expostas no código.
// A segurança é garantida através de:
// 1. Restrições de domínio no Firebase Console
// 2. Regras de banco de dados
// 3. Autenticação com login/senha

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDI7ysz3DpVHUkNYiu2gIK9l0AXU8Cy0mI",
  authDomain: "gestao-de-geradores.firebaseapp.com",
  projectId: "gestao-de-geradores",
  storageBucket: "gestao-de-geradores.firebasestorage.app",
  messagingSenderId: "727322219779",
  appId: "1:727322219779:web:2605d77a1795c89ccd4536",
  databaseURL: "https://gestao-de-geradores-default-rtdb.firebaseio.com"
};

export function getFirebaseConfig() {
  return FIREBASE_CONFIG;
}

// Prefira usar a versão modular menor do Firebase
export const DB_KEY = 'geradores';

// Inicialização lazy do Firebase
let dbInstance = null;
let appInstance = null;

export async function getFirebase() {
  if (appInstance && dbInstance) return { app: appInstance, db: dbInstance };
  
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js');
  const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js');
  
  appInstance = initializeApp(FIREBASE_CONFIG);
  dbInstance = getDatabase(appInstance);
  
  return { app: appInstance, db: dbInstance };
}

export const getDb = async () => (await getFirebase()).db;