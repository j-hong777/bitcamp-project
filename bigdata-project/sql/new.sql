-- 메뉴 대분류

create table menu_category(

    mcno integer null,
    mtype varchar(20) not null,
    mcdate datetime not null default now(),
    delchk char(1) not null default 'N',
    mccontent varchar(60) not null,
    manager varchar(30) not null
);

alter table menu_category add constraint primary key menu_category_mcno_pk(mcno);
alter table menu_category modify mcno integer not null auto_increment;
alter table menu_category add constraint unique key menu_category_mtype_uk(mtype);

-- 메뉴 상세

create table menu(
    mno integer null,
    mcno integer not null,
    mname varchar(30) not null,
    mprice varchar(30) not null,
    mcontent varchar(100) not null,
    mdate datetime not null default now(),
    delchk char(1) not null default 'N',
    manager varchar(30) not null
);

-- 메뉴 key

alter table menu add constraint primary key menu_mno_pk(mno);
alter table menu modify mno integer not null auto_increment;
alter table menu add foreign key menu_mcno_fk(mcno)
references menu_category(mcno);

-- 메뉴 사진

create table menu_image(
    mino integer null,
    mno integer not null,
    filename varchar(255) not null,
    newfilename varchar(255) not null,
    midate datetime not null default now()
);

alter table menu_image add primary key menu_image_mino_pk(mino);
alter table menu_image modify mino integer not null auto_increment;
alter table menu_image add foreign key menu_image_mino_fk(mno)
references menu(mno);

-- 메뉴 템플릿

create table menu_temp(
  mtno integer null,
  bno  integer not null,
  mttype varchar(20) not null,
  mtarea varchar(20) not null,
  mname varchar(30) not null,
  mtype varchar(30) not null,
  mprice varchar(30) not null,
  mcontent varchar(30) not null,
  mtdate datetime not null default now(),
  delchk char(1) not null default 'N'
);


alter table menu_temp add primary key menu_temp_mtno_pk(mtno);
alter table menu_temp modify mtno integer not null auto_increment;
alter table menu_temp add foreign key menu_temp_bno_fk(bno)
references branch(bno);

-- 요청 확인 테이블

create table menu_confirm(
  mtcno integer null,
  bname  varchar(30) not null,
  mttype varchar(20) not null,
  mtarea varchar(20) not null,
  mname varchar(30) not null,
  mtype varchar(30) not null,
  mprice varchar(30) not null,
  mcontent varchar(30) not null,
  mtdate datetime not null default now(),
  delchk char(1) not null default 'N'
);


alter table menu_confirm add primary key menu_confirm_mtno_pk(mtcno);
alter table menu_confirm modify mtcno integer not null auto_increment;

-- 게시판 분류

create table board_category(
    bcno integer null,
    category varchar(20) not null,
    manager varchar(30) not null,
    bdinfo varchar(60) not null,
    bddate datetime not null default now(),
    delchk char(1) not null default 'N'
);

alter table board_category add primary key board_category_bcno_pk(bcno);
alter table board_category modify bcno integer not null auto_increment;
alter table board_category add constraint unique key board_category_category_uk(category);

-- 게시판 테이블

create table board(
    bdno integer null,
    bdtype integer not null,
    bdwriter varchar(20) not null,
    bdsubject varchar(40) not null,
    bdhit integer not null default 0,
    bdcontent varchar(300) not null,
    bddate datetime not null default now(),
    bdupdate datetime not null default now(),
    delchk char(1) not null default 'N'
);

alter table board add constraint primary key board_bdno_pk(bdno);
alter table board modify bdno integer not null auto_increment;
alter table board add constraint foreign key board_bdtype_fk(bdtype)
references board_category(bcno);

-- 게시판 파일

create table board_file(
  bfno integer null,
  bdno integer not null,
  filename varchar(255) not null,
  newfilename varchar(255) not null,
  bfdate datetime not null default now()
);

alter table board_file add constraint primary key board_file_bfno_pk(bfno);
alter table board_file modify bfno integer not null auto_increment;
alter table board_file add constraint foreign key board_file_bdno_fk(bdno)
references board(bdno);

-- 댓글

create table reply(
    rno integer null,
    bdno integer not null,
    rcontent varchar(20) not null,
    replyer varchar(20) not null,
    rsubject varchar(40) not null,
    rdate datetime not null default now()
);

alter table reply add constraint primary key reply_rno_pk(rno);
alter table reply modify rno integer not null auto_increment;
alter table reply add constraint foreign key reply_bdno_fk(bdno)
references board(bdno);

