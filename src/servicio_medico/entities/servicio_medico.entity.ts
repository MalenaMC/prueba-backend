import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('servicio_medico')
export class ServicioMedico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 150})
    nombre: string;

    @Column({length: 500})
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    costo: number;

    @Column()
    duracion: number;

    @Column({type: 'timestamp'})
    fechaApertura: Date;
    
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deletedAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.servicios, { onDelete: 'SET NULL' })
    @JoinColumn({name: 'usuarioId'})
    usuario?: Usuario
}