import { type } from "os";
import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    pricePerUnit: number;

    @Column({ default: 0 })
    minMassOrderQuantity: number;

    @ManyToOne(() => ProductType, productType => productType.products)
    @JoinColumn()
    productType: string;

    @Column({ type: 'uuid' })
    createdBy: string;

    @Column({ type: 'uuid' })
    lastUpdatedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class ProductType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'uuid' })
    createdBy: string;

    @Column({ type: 'uuid' })
    lastUpdatedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, product => product.productType)
    products: Product[];
}