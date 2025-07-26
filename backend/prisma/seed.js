"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@silvaferrea.com' },
        update: {},
        create: {
            email: 'admin@silvaferrea.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: client_1.UserRole.OWNER,
        },
    });
    console.log('✅ Admin user created:', adminUser.email);
    const property1 = await prisma.property.create({
        data: {
            name: 'Villa Solna',
            address: 'Solna väg 123, 171 65 Solna',
            purchasePrice: 2500000,
            acquisitionDate: new Date('2023-01-15'),
            currentMarketValue: 2750000,
            size: 120.5,
            numberOfRooms: 4,
            amenities: ['Balcony', 'Garden', 'Parking', 'Storage'],
            ownershipShare: 100,
            userId: adminUser.id,
        },
    });
    const property2 = await prisma.property.create({
        data: {
            name: 'Apartment Stockholm',
            address: 'Stockholm gatan 45, 111 22 Stockholm',
            purchasePrice: 1800000,
            acquisitionDate: new Date('2023-06-20'),
            currentMarketValue: 1950000,
            size: 85.0,
            numberOfRooms: 3,
            amenities: ['Balcony', 'Elevator', 'Storage'],
            ownershipShare: 100,
            userId: adminUser.id,
        },
    });
    console.log('✅ Sample properties created');
    await prisma.loan.create({
        data: {
            bankName: 'SEB',
            loanAmount: 2000000,
            interestRate: 0.035,
            startDate: new Date('2023-01-15'),
            monthlyPayment: 8500,
            remainingBalance: 1950000,
            propertyId: property1.id,
        },
    });
    await prisma.loan.create({
        data: {
            bankName: 'Nordea',
            loanAmount: 1400000,
            interestRate: 0.032,
            startDate: new Date('2023-06-20'),
            monthlyPayment: 6200,
            remainingBalance: 1380000,
            propertyId: property2.id,
        },
    });
    console.log('✅ Sample loans created');
    const tenant1 = await prisma.tenant.create({
        data: {
            firstName: 'Anna',
            lastName: 'Andersson',
            email: 'anna.andersson@email.com',
            phone: '+46 70 123 4567',
            rentAmount: 15000,
            deposit: 30000,
            contractStartDate: new Date('2023-02-01'),
            contractEndDate: new Date('2024-01-31'),
            status: 'ACTIVE',
            propertyId: property1.id,
            userId: adminUser.id,
        },
    });
    const tenant2 = await prisma.tenant.create({
        data: {
            firstName: 'Erik',
            lastName: 'Eriksson',
            email: 'erik.eriksson@email.com',
            phone: '+46 70 987 6543',
            rentAmount: 12000,
            deposit: 24000,
            contractStartDate: new Date('2023-07-01'),
            contractEndDate: new Date('2024-06-30'),
            status: 'ACTIVE',
            propertyId: property2.id,
            userId: adminUser.id,
        },
    });
    console.log('✅ Sample tenants created');
    await prisma.rentPayment.createMany({
        data: [
            {
                amount: 15000,
                dueDate: new Date('2023-12-01'),
                paidDate: new Date('2023-12-01'),
                status: 'PAID',
                invoiceNumber: 'INV-2023-12-001',
                tenantId: tenant1.id,
            },
            {
                amount: 15000,
                dueDate: new Date('2024-01-01'),
                status: 'UNPAID',
                invoiceNumber: 'INV-2024-01-001',
                tenantId: tenant1.id,
            },
            {
                amount: 12000,
                dueDate: new Date('2023-12-01'),
                paidDate: new Date('2023-12-01'),
                status: 'PAID',
                invoiceNumber: 'INV-2023-12-002',
                tenantId: tenant2.id,
            },
            {
                amount: 12000,
                dueDate: new Date('2024-01-01'),
                status: 'UNPAID',
                invoiceNumber: 'INV-2024-01-002',
                tenantId: tenant2.id,
            },
        ],
    });
    console.log('✅ Sample rent payments created');
    await prisma.transaction.createMany({
        data: [
            {
                date: new Date('2023-12-01'),
                amount: 15000,
                category: 'RENT_INCOME',
                description: 'Rent payment from Anna Andersson',
                propertyId: property1.id,
                userId: adminUser.id,
            },
            {
                date: new Date('2023-12-01'),
                amount: 12000,
                category: 'RENT_INCOME',
                description: 'Rent payment from Erik Eriksson',
                propertyId: property2.id,
                userId: adminUser.id,
            },
            {
                date: new Date('2023-12-15'),
                amount: -8500,
                category: 'LOAN_PAYMENT',
                description: 'Monthly loan payment to SEB',
                propertyId: property1.id,
                userId: adminUser.id,
            },
            {
                date: new Date('2023-12-15'),
                amount: -6200,
                category: 'LOAN_PAYMENT',
                description: 'Monthly loan payment to Nordea',
                propertyId: property2.id,
                userId: adminUser.id,
            },
            {
                date: new Date('2023-12-10'),
                amount: -2500,
                category: 'MAINTENANCE_EXPENSE',
                description: 'Plumbing repair - Villa Solna',
                propertyId: property1.id,
                userId: adminUser.id,
            },
        ],
    });
    console.log('✅ Sample transactions created');
    await prisma.maintenanceEvent.create({
        data: {
            taskName: 'Plumbing Repair',
            category: 'Plumbing',
            status: 'COMPLETED',
            costEstimate: 2500,
            actualCost: 2500,
            contractorName: 'FastighetsService AB',
            contractorPhone: '+46 8 123 4567',
            description: 'Fixed leaking faucet in kitchen',
            scheduledDate: new Date('2023-12-10'),
            completedDate: new Date('2023-12-10'),
            propertyId: property1.id,
            userId: adminUser.id,
        },
    });
    console.log('✅ Sample maintenance events created');
    console.log('🎉 Database seeding completed!');
    console.log('📧 Login with: admin@silvaferrea.com / admin123');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map