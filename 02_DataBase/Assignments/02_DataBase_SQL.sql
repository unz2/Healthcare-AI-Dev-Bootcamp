
-- 실습1
create database hospital_lab;
use hospital_lab;


-- 실습2
create table patients (
	patient_id int auto_increment primary key,
    name varchar(20) not null,
    birth_date date,
    gender enum ('M', 'F') not null,
    phone varchar(20)
);


-- 실습3
create table doctors (
	doctor_id int auto_increment primary key,
    name varchar(20) not null,
    license int not null,
    specialty varchar(20) not null,
    hire_date date
);


-- 실습4
create table appointments (
	appointment_id int auto_increment primary key,
    patient_id int not null,
    doctor_id int not null,
    foreign key (patient_id) references patients(patient_id),
    foreign key (doctor_id) references doctors(doctor_id),
    memo text,
    appointment_date date,
    status enum('Scheduled', 'Completed', 'Cancelled')
);


-- 실습5
insert into patients(name, birth_date, gender, phone)
values 
('홍길동', '2000-01-01', 'F', '010-1234-5678'),
('김길동', '2001-01-01', 'F', '010-5678-1234'),
('박길동', '2002-01-01', 'M', '010-9876-4321');

insert into doctors (name, license, specialty, hire_date)
values
('유재석', 12345, '내과', '2024-01-01'),
('박명수', 54321, '외과', '2025-01-01'),
('정준하', 98765, '정형외과', '2022-01-01');

insert into appointments(patient_id, doctor_id, memo, appointment_date, status)
values
(1, 1, '독감 예방주사 원함', '2025-10-20', 'Scheduled'),
(2, 1, '감기 증상으로 내원', '2025-10-21', 'Scheduled'),
(3, 2, '길에서 넘어져 타박상', '2025-10-22', 'Scheduled');


-- 실습6
select * from patients;
select * from patients where gender = ‘F’;
select * from appointments order by appointment_date desc;


-- 실습7
update patients set phone ='010-9999-8888' where patient_id = 1;
update appointments set status = 'Completed' where appointment_date < NOW();


-- 실습8
delete from appointments where appointment_id = 3;


-- 실습9
select * from patients where name like '김%';
select * from appointments where appointment_date between '2025-10-20' and '2025-10-21';
select * from appointments where memo like '%감기%';