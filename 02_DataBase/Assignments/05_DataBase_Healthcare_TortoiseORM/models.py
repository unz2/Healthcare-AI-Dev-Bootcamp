from tortoise import fields, models

class Patients(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, index=True)
    gender = fields.CharField(max_length=1)
    birthdate = fields.DateField(null=True)
    
    def __str__(self):
        return self.name
    
class Drugs(models.Model):
    id = fields.IntField(pk=True)
    drug_code = fields.CharField(max_length=20, unique=True)
    drug_name = fields.CharField(max_length=200, index=True)
    drug_company = fields.CharField(max_length=200, null=True)
    company_phone = fields.CharField(max_length=30, null=True)
    
    
class Health_Metrics(models.Model):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField('models.Patients', related_name='metrics', on_delete=fields.CASCADE)
    date = fields.DateField()
    weight = fields.DecimalField(max_digits=5, decimal_places=2, null=True)
    height = fields.DecimalField(max_digits=5, decimal_places=2, null=True)
    systolic = fields.SmallIntField(null=True)
    diastolic = fields.SmallIntField(null=True)
    glucose = fields.SmallIntField(null=True)
    heart_rate = fields.SmallIntField(null=True)
    
    
class Treatments(models.Model):
    id = fields.IntField(pk=True)
    patient = fields.ForeignKeyField('models.Patients', related_name='treatments', on_delete=fields.CASCADE)
    drug = fields.ForeignKeyField('models.Drugs', related_name='treatments', on_delete=fields.RESTRICT)
    date = fields.DateField()
    dose = fields.CharField(max_length=50,null=True)
    prescription = fields.CharField(max_length=200,null=True)