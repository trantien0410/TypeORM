import { Album } from "./entity/Album";
import { Author } from "./entity/Author";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Photo } from "./entity/Photo";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    // // Create Photo
    // const photo = new Photo();
    // photo.name = "Me and Bears and Dogs";
    // photo.description = "I am near polar bears and dogs";
    // photo.filename = "photo-with-bears and dogs.jpg";
    // photo.views = 5;
    // photo.isPublished = true;

    // // // Create a photo metadata
    // // const metadata = new PhotoMetadata();
    // // metadata.height = 640;
    // // metadata.width = 480;
    // // metadata.compressed = true;
    // // metadata.comment = "cybershoot";
    // // metadata.orientation = "portrait";
    // // // metadata.photo = photo; // this way we connect them

    // // photo.metadata = metadata; // this way we connect them

    // // Create Author
    // const author = new Author();
    // author.name = "Peter";
    // author.photos = [photo];

    // // Get entity repositories
    // const photoRepository = AppDataSource.getRepository(Photo);
    // const authorRepository = AppDataSource.getRepository(Author);
    // await photoRepository.save(photo);
    // await authorRepository.save(author);
    // console.log(
    //   "Author is saved, and the relation between author and photo is created in the database too"
    // );

    // // Saving a phot  also save the metadata
    // await photoRepository.save(photo);
    // console.log("Photo is saved, photo metadata is saved too.");

    // // find* methods
    // const photos = await photoRepository.find({
    //   relations: {
    //     metadata: true,
    //   },
    // });

    // QueryBuilder functionality
    // const photos = await AppDataSource.getRepository(Photo)
    //   .createQueryBuilder("photo")
    //   .innerJoinAndSelect("photo.metadata", "metadata")
    //   .where("metadata.width > 10")
    //   .getMany();
    // const metadataRepository = AppDataSource.getRepository(PhotoMetadata);

    // First we should save photo
    // await photoRepository.save(photo);

    // // Photo is saved. Now we need to save photo metadata
    // await metadataRepository.save(metadata);

    // //Done
    // console.log(
    //   "Metadata is saved, and the relation between metadata and photo is created in the database too"
    // );

    // Using Entity Manager
    // await photoRepository.manager.save(photo);
    // console.log("Photo has been saved");

    // const allPhotos = await photoRepository.find();
    // console.log("All photos from the db: ", allPhotos);

    // Loading from the database
    // const firstPhoto = await photoRepository.findOneBy({
    //   id: 1,
    // });
    // console.log("First photo from the db: ", firstPhoto);

    // const meAndBearsPhoto = await photoRepository.findOneBy({
    //   name: "Me and Bears",
    // });
    // console.log("Me and Bears photo from db: ", meAndBearsPhoto);

    // const allViewedPhotos = await photoRepository.findBy({
    //   views: 1,
    // });
    // console.log("All viewed photos: ", allViewedPhotos);

    // const allPublishedPhotos = await photoRepository.findBy({
    //   isPublished: true,
    // });
    // console.log("All published photos: ", allPublishedPhotos);

    // const [photos, photosCount] = await photoRepository.findAndCount();
    // console.log("All photos: ", photos);
    // console.log("Photos count: ", photosCount);

    // Updating in the database
    // const photoToUpdate = await photoRepository.findOneBy({
    //   id: 1,
    // });
    // photoToUpdate.name = "Me, my friends and polar bears";
    // await photoRepository.save(photoToUpdate);

    // Removing from the database
    // const photoToRemove = await photoRepository.findOneBy({
    //   id: 5,
    // });
    // await photoRepository.remove(photoToRemove);

    // //Removing from the database
    // const authorToRemove = await authorRepository.findOneBy({
    //   id: 1,
    // });
    // await authorRepository.remove(authorToRemove);
    // console.log("Remove successfully");

    // Create a few albums
    const album1 = new Album();
    album1.name = "Bears";
    const album1Repository = AppDataSource.getRepository(Album);
    await album1Repository.save(album1);
    const album2 = new Album();

    album2.name = "Me";
    const album2Repository = AppDataSource.getRepository(Album);
    await album2Repository.save(album2);

    // Create Photo
    const photo = new Photo();
    photo.name = "My";
    photo.description = "I am near polar bears and dogs";
    photo.filename = "photo-with-bears and dogs.jpg";
    photo.views = 2;
    photo.isPublished = true;
    photo.albums = [album1, album2];
    const photoRepository = AppDataSource.getRepository(Photo);
    await photoRepository.save(photo);
    // now our photo is saved and albums are attached to it
    // now lets load them:
    const loadedPhoto = await photoRepository.findOne({
      where: {
        id: 13,
      },
      relations: {
        albums: true,
      },
    });
    console.log("LoadedPhoto", loadedPhoto);
    
    const photos = await AppDataSource.getRepository(Photo)
    .createQueryBuilder("photo") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .leftJoinAndSelect("photo.metadata", "metadata")
    .leftJoinAndSelect("photo.albums", "albums")
    .where("photo.isPublished = true")
    .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    .orderBy("photo.id", "DESC")
    // .skip(5)
    // .take(10)
    .setParameters({ photoName: "My", bearName: "Mishka" })
    .getMany();
    console.log("Photo: ", photos);
})

  .catch((error) => console.log(error));
