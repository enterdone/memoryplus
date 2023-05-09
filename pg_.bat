@echo off

IF "%1"=="-f" (
  echo Running first command...
  psql -d mydatabase -f myscript.sql
) ELSE IF "%1"=="-u" (
  echo Running second command...
  psql -U myusername -d mydatabase -c "SELECT * FROM mytable;"
) ELSE IF "%1"=="-s" (
  echo Start pg...
  pg_ctl start -D "D:\Program Files\PostgreSQL\15\data"
) ELSE IF "%1"=="-e" (
  echo End pg...
  pg_ctl stop -D "D:\Program Files\PostgreSQL\15\data"
) ELSE IF "%1"=="-pgd" (
  echo set PGDATA="D:\Program Files\PostgreSQL\15\data"...
  set PGDATA="D:\Program Files\PostgreSQL\15\data"
) ELSE (
  echo Invalid argument: %1
  echo -pgd set PGDATA=
   Usage: pg_.bat [-f|-u|-s|-e|-pgd]

)

pause