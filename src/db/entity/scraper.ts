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

    @Column({ type: 'enum', enum: ['active', 'suspended'], nullable: false, default: "suspended" })
    status?: string;

    @Column({ type: 'timestamp', nullable: true })
    lastRun?: Date;

    @Column({ type: 'timestamp', nullable: true })
    nextRunScheduled?: Date;

    @UpdateDateColumn()
    updatedAt?: Date; // Automatically updated on save/update

    // Note: createdAt is not shown here, but you can use @CreateDateColumn() similarly if needed
    @CreateDateColumn()
    readonly createdAt?: Date;

    /*
    constructor(
        name: string,
        category: string,
        rootUrl: string,
        entryUrl: string,
        language: string,
        siteType: string,
        nextPageType: string,
        lastUrlSelector: string,
        lastPageNumberRegExp: string,
        nextPageParameter: string,
        nextPageLinkSelector: string,
        nextPageUrlRegExp: string,
        tagFiltering: boolean,
        tagCollect: boolean,
        tags: string,
        indexLinkSelector: string,
        articleBlockSelector: string,
        articleTitleSelector: string,
        articleBodySelector: string,
        articleTagSelector: string,
        frequency: string,
        status: string,

    ) {
        this.name = name;
        this.category = category;
        this.rootUrl = rootUrl;
        this.entryUrl = entryUrl;
        this.language = language;
        this.siteType = siteType;
        this.nextPageType = nextPageType;
        this.lastUrlSelector = lastUrlSelector;
        this.lastPageNumberRegExp = lastPageNumberRegExp;
        this.nextPageParameter = nextPageParameter;
        this.nextPageLinkSelector = nextPageLinkSelector;
        this.nextPageUrlRegExp = nextPageUrlRegExp;
        this.tagFiltering = tagFiltering;
        this.tagCollect = tagCollect;
        this.tags = tags;
        this.indexLinkSelector = indexLinkSelector;
        this.articleBlockSelector = articleBlockSelector;
        this.articleTitleSelector = articleTitleSelector;
        this.articleBodySelector = articleBodySelector;
        this.articleTagSelector = articleTagSelector;
        this.frequency = frequency;
        this.status = status;
    }
    */
}

export default Scrapers;