// ZOLNA Payment System - 2% Commission

class ZolnaPayment {
    constructor() {
        this.commissionRate = 0.02; // 2%
        this.platformAccount = "ZOLNA_PLATFORM"; // حساب الموقع
    }

    // Process a sale
    async processSale(productId, buyerId, sellerId, amount) {
        const commission = Math.floor(amount * this.commissionRate);
        const sellerGets = amount - commission;

        const transaction = {
            productId: productId,
            buyerId: buyerId,
            sellerId: sellerId,
            totalAmount: amount,
            commission: commission,
            sellerAmount: sellerGets,
            platformAmount: commission,
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        // Save to Firestore
        await firebase.firestore().collection('transactions').add(transaction);

        return {
            success: true,
            message: `تم خصم ${commission} جنيه (2%) نسبة الموقع`,
            sellerReceives: sellerGets
        };
    }

    // Get platform earnings (for admin)
    async getPlatformEarnings() {
        const snapshot = await firebase.firestore()
            .collection('transactions')
            .where('status', '==', 'completed')
            .get();
        
        let total = 0;
        snapshot.forEach(doc => {
            total += doc.data().platformAmount;
        });
        
        return total; // إجمالي أرباح الموقع
    }

    // Get seller earnings
    async getSellerEarnings(sellerId) {
        const snapshot = await firebase.firestore()
            .collection('transactions')
            .where('sellerId', '==', sellerId)
            .where('status', '==', 'completed')
            .get();
        
        let total = 0;
        snapshot.forEach(doc => {
            total += doc.data().sellerAmount;
        });
        
        return total; // إجمالي فلوس البائع
    }
}

// Create instance
const zolnaPayment = new ZolnaPayment();
