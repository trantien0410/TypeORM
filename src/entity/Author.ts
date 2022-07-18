import { Photo } from "./Photo";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Photo, (photo) => photo.author) // We will create author property in Photo class below
  photos: Photo[];
}
