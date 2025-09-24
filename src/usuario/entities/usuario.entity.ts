import { ServicioMedico } from "src/servicio_medico/entities/servicio_medico.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 150})
    nombre: string;

    @Column({length: 100, unique: true})
    email: string;

    @Column({length: 100 })
    contrasena: string;

    @Column({type: 'enum', enum: ['administrador', 'cliente'], default: 'cliente'})
    rol: string;

    @Column({type: 'enum', enum: ['activo', 'inactivo'], default: 'activo'})
    estado: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
    
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
    
    @DeleteDateColumn({type: 'timestamp'})
    deletedAt: Date;

    @OneToMany(() => ServicioMedico, servicio => servicio.usuario)
    servicios: ServicioMedico[];
}