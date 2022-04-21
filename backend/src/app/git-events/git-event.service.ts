import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GitCommit } from '../entities/GitCommit'
import { EventPayload } from './git-event.dto'

@Injectable()
export class GitEventService {
    constructor(
        @InjectRepository(GitCommit)
        private readonly gitCommitRepository: Repository<GitCommit>
    ) {}

    async handlePushEvent(data: EventPayload): Promise<void> {
        data.commits.map(async commit => {
            const findCommit = await this.gitCommitRepository.findOne({
                where: { externalId: commit.id }
            })

            if (findCommit) return

            await this.gitCommitRepository.insert({
                repositoryId: data.repository.id,
                externalId: commit.id,
                message: commit.message,
                createdAt: commit.timestamp,
                url: commit.url
            })
        })
    }
}
