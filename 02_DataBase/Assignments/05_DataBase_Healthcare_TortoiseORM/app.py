from tortoise import Tortoise
from config import TORTOISE_ORM
import asyncio
from utils import latest_metrics, treatments_with_drug_and_patient, risk_patient


async def main():
    await Tortoise.init(config=TORTOISE_ORM)
    await latest_metrics(1, 3)
    await treatments_with_drug_and_patient()
    await risk_patient()


if __name__ == "__main__":
    asyncio.run(main())