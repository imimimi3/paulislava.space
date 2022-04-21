import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('git_commits')
export class GitCommit {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'repository_id' })
    repositoryId: number

    @Column({ name: 'external_id ' })
    externalId: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column()
    url: string | null

    @Column()
    message: string
}
