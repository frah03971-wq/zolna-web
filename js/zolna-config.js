// Firebase Configuration - ZOLNA
const firebaseConfig = {
  apiKey: "AIzaSyCx9a7vzp5x0PM6_BurDdfXXhjvJwgbx_U",
  authDomain: "zolna-sd.firebaseapp.com",
  projectId: "zolna-sd",
  storageBucket: "zolna-sd.firebasestorage.app",
  messagingSenderId: "1079282652053",
  appId: "1:1079282652053:web:fd8cb84c19aff096b45c9c",
  measurementId: "G-V2KJ0CVRBX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Commission Rate: 2%
const COMMISSION_RATE = 0.02;

// Calculate commission for any sale
function calculateZolnaCommission(price) {
    const commission = Math.round(price * COMMISSION_RATE);
    const sellerAmount = price - commission;
    
    return {
        originalPrice: price,
        commission: commission,
        sellerGets: sellerAmount,
        zolnaGets: commission
    };
}

// Example:
// calculateZolnaCommission(100000) 
// Returns: {originalPrice: 100000, commission: 2000, sellerGets: 98000, zolnaGets: 2000}
