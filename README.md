# Awesome Project Build with TypeORM

To follow the code above: Access to this link https://typeorm.io/

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

- Run `npx typeorm init --name MyProject --database postgres`.
![Example](https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/293541449_761982161668667_980414147845376239_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=ZzencpjXQW8AX-3OF7A&_nc_ht=scontent.fsgn2-3.fna&oh=03_AVLlav2e5eOhEUgrBCdxBHKvV5NtWaIvISiXi1FTwSJxCw&oe=62FC3758)
## Inverse side of the relationship

- photo => photo.metadata is a function that returns the name of the inverse side of the relation. Here we show that the metadata property of the Photo class is where we store PhotoMetadata in the Photo class. Instead of passing a function that returns a property of the photo, you could alternatively simply pass a string to @OneToOne decorator, like "metadata". But we used this function-typed approach to make our refactoring easier.
- Note that we should use the @JoinColumn decorator only on one side of a relation. Whichever side you put this decorator on will be the owning side of the relationship. The owning side of a relationship contains a column with a foreign key in the database.

![Example](https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/292574154_985440518781308_588251428398488048_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=wK2wCZRkW3wAX-zTtXe&_nc_ht=scontent.fsgn2-6.fna&oh=03_AVLjaRJdNDAU4YpoXUrhqySCxyYRdmWF5LTvtvstwAQUjQ&oe=62F953AB)

![Example](https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/293310824_1494267314320059_1367274905463072510_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=0q5CvSut3d4AX9_fs7R&tn=d9dU3yGvY97rmBqU&_nc_ht=scontent.fsgn2-4.fna&oh=03_AVJec_2rW5DgqSOQ2UKLmlM41k3dGNXTMwfEV2tpNoclfg&oe=62F9FC56)


## Creating a many-to-one / one-to-many relation

- Author contains an inverse side of a relation. OneToMany is always an inverse side of the relation, and it can't exist without ManyToOne on the other side of the relation.
- In many-to-one / one-to-many relation, the owner side is always many-to-one. It means that the class that uses @ManyToOne will store the id of the related object.

![Example](https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/293632972_1361808010995531_4452341335600990665_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=9jKGseAvmOwAX9R6_Sc&tn=d9dU3yGvY97rmBqU&_nc_ht=scontent.fsgn2-4.fna&oh=03_AVKlnHo-FEqIv15caqCTrOCAo-JvX_-83HwUks12BvZFrg&oe=62FC7ADC)
