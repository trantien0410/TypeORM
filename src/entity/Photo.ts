import { Album } from './Album';
import { Author } from "./Author";
import { PhotoMetadata } from "./PhotoMetadata";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column("double")
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(() => PhotoMetadata, (metadata) => metadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadata;

  @ManyToOne(() => Author, (author) => author.photos, {
    onDelete: "CASCADE", // help to delete both sides
  })
  author: Author;
  @ManyToMany(() => Album, (album) => album.photos)
  albums: Album[];
}
