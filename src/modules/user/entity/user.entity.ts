import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../interface/role.interface";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    phone: number;

    @Column({ nullable: true })
    email: string;

    @Column()
    password: string;

    @Column('simple-array', {
        default: [Role.User],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })
    roles: string[];
}