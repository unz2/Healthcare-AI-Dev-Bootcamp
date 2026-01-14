# 테이블 구조 정의하는 모듈

from tortoise import fields, models

class Patient(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=20, index=True)
    birth_date = fields.DateField(null=True)
    phone = fields.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.name


class Doctor(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=20, index=True)
    specialty = fields.CharField(max_length=20, null=True)
    
    def __str__(self):
        return self.name


class Appointment(models.Model):
    id = fields.IntField(pk=True)
    
    patient = fields.ForeignKeyField(
        'models.Patient',
        related_name='appointments',
        on_delete=fields.CASCADE
    )
    
    doctor = fields.ForeignKeyField(
        'models.Doctor',
        related_name='appointments',
        on_delete=fields.RESTRICT
    )
    
    visit_date = fields.DatetimeField(index=True)
    note = fields.TextField()