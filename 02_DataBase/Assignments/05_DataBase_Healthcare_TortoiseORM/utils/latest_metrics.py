from models import Health_Metrics, Treatments
from tortoise.models import Q

async def latest_metrics(patient_id: int, limit: int=3):
        rows = (Health_Metrics
            .filter(patient_id=patient_id)
            .select_related('patient')
            .order_by('-date')
            .limit(limit))
    
        for r in await rows:
            print(r.patient.id, r.patient.name, r.date, r.systolic, r.diastolic, r.glucose, r.heart_rate)


async def treatments_with_drug_and_patient():
    rows = await Treatments.all().select_related('patient', 'drug')
    
    for t in rows:
        print(t.id, t.date, t.patient.name, t.drug.drug_name, t.drug.drug_company, t.dose, t.prescription)


async def risk_patient():
    rows = (Health_Metrics
        .filter(Q(systolic__gt = 140) | Q(glucose__gt = 200))
        .select_related('patient')
        .order_by('patient_id', '-date'))
    
    for r in await rows:
        print(r.patient.id, r.patient.name, r.date, r.systolic, r.diastolic, r.glucose, r.heart_rate)