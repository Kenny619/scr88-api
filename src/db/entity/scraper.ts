import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Scrapers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'varchar', length: 400 })
    rootUrl: string;

    @Column({ type: 'varchar', length: 400 })
    entryUrl: string;

    @Column({ type: 'enum', enum: ['JP', 'EN'], nullable: false })
    language: string;

    @Column({ type: 'enum', enum: ['links', 'single', 'multiple'], nullable: false })
    siteType: string;

    @Column({ type: 'enum', enum: ['last', 'parameter', 'url', 'next', 'pagenation'], nullable: false })
    nextPageType: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastUrlSelector: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastPageNumberRegExp: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nextPageParameter: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nextPageLinkSelector: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nextPageUrlRegExp: string;

    @Column({ type: 'boolean', default: false })
    tagFiltering: boolean;

    @Column({ type: 'boolean', default: true })
    tagCollect: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    tags: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    indexLinkSelector: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    articleBlockSelector: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    articleTitleSelector: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    articleBodySelector: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    articleTagSelector: string;

    @Column({ type: 'enum', enum: ['daily', 'weekly', 'monthly'], nullable: false })
    frequency: string;

    @Column({ type: 'enum', enum: ['active', 'suspended'], nullable: false })
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    lastRun: Date;

    @Column({ type: 'timestamp', nullable: true })
    nextRunScheduled: Date;

    @UpdateDateColumn()
    updatedAt: Date; // Automatically updated on save/update

    // Note: createdAt is not shown here, but you can use @CreateDateColumn() similarly if needed
    @CreateDateColumn()
    createdAt: Date;
}

export default Scrapers;