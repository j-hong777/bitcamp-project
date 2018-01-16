-- BranchMaster

alter table branch_master add primary key(bmno);

alter table branch_master modify column bmno int not null auto_increment;

alter table branch_master add unique key(bmemail);

alter table branch_master modify column bmgrade varchar(50) DEFAULT 'branch_master';

insert into branch_master(bmno, bmemail, bmpwd, bmname, bmtel) values(1, "kshf59@naver.com", password('1111'), "김상훈", "010-9790-2409");
insert into branch_master(bmno, bmemail, bmpwd, bmname, bmtel, bmgrade) values(2, "admin@admin.com", password('1111'), "admin", "010-1111-1111", "admin");

-- Branch
alter table branch add primary key(bno);

alter table branch modify column bno int not null auto_increment;

alter table branch add constraint fk_bmno foreign key(bmno) references branch_master(bmno);

insert into branch(bno, bmno, bname, baddr, btel, bintro, barea) values(1, 1, "서초점", "서울특별시 서초구 서초동", "02-111-1111", "안녕하세요 서초점입니다.", "서울특별시 서초구");
insert into branch(bno, bmno, bname, baddr, btel, bintro, barea) values(2, 1, "잠실점", "서울특별시 송파구 잠실1동", "02-222-2222", "안녕하세요 잠실점입니다.", "서울특별시 송파구");
insert into branch(bno, bmno, bname, baddr, btel, bintro, barea) values(3, 1, "삼성점", "서울특별시 강남구 삼성동", "02-333-3333", "안녕하세요 삼성점입니다.", "서울특별시 강남구");


-- branch_file
alter table branch_file add primary key(fmno);

alter table branch_file modify column fmno int not null auto_increment;

alter table branch_file add constraint fk_bno foreign key(bno) references branch(bno);

-- event_template
alter table event_template add primary key(etpno);

alter table event_template modify column etpno int not null auto_increment;

insert into event_template(etptitle, etpinfo, etpimg) values('Slide_Event', '슬라이드 이미지', 'file_1515135618509_0');
insert into event_template(etptitle, etpinfo, etpimg) values('Focus_Event', '고정 이미지', 'file_1515135618509_0');

-- event
alter table event add primary key(evno);

alter table event modify column evno int not null auto_increment;

alter table event add constraint fk_etpno foreign key(etpno) references event_template(etpno);

alter table event add constraint fke_bno foreign key(bno) references branch(bno);

-- event_file
alter table event_file add primary key(efno);

alter table event_file modify column efno int not null auto_increment;

alter table event_file add constraint fk_evno foreign key(evno) references event(evno);
