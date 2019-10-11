create table mynames(
	id serial not null primary key,
	greeted_names text not null,
	greet_count int not null
);