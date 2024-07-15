import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
class SiteCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date; // Automatically updated on save/update

    // Note: createdAt is not shown here, but you can use @CreateDateColumn() similarly if needed
    @UpdateDateColumn()
    lastUpdatedAt: Date;
}

export default SiteCategory;