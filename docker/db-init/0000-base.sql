create table intraday (
  id serial primary key,
  symbol text not null,
  data_time timestamptz not null,
  close numeric(10,2) not null,
  high numeric(10,2) not null,
  low numeric(10,2) not null,
  open numeric(10,2) not null,
  volume int not null,
  date_created timestamptz not null default now()
);

create user auser with password 'somepassword';
grant select, insert, update, delete on all tables in schema public to auser;
grant all on all sequences in schema public to auser;
revoke create on schema public from public;
