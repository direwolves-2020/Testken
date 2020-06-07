from model.pulse_entities import AccountEntity
from model.data_cleaning_service import DataCleaningService
from model.pulse_dao import PulseDAO


test =  {"accountName":"Abbott","contractStart":"1/18/2020","contractEnd":"1/18/2021","softwareCost":"100000","researchServiceCost":"40000","creditsPurchased":"36","cmServiceCost":"12000","incentiveBudget":"12000","recruitmentBudget":"8000","accountManager":"Ken Reilly","communityManager":"Megan McCarthy","teamResponsible":"R&I","industry":"Medical Devices"}


class PulseController:
    def __init__(self):
        self.accountObject = None
        self.datacleaningservice = DataCleaningService()
        self.pulseDAO = PulseDAO()


    # Create New Account
    def CreateNewAccount(self, new_account_form):
        #After Validation, I need to receive the JSON and insert into the DB via the DAO.
        self.pulseDAO.add_new_account(new_account_form)
        ##########################
        #What should I return?????
        return self.accountObject

    def FetchAccountsForUpdateAccountPage(self):
        accounts = self.pulseDAO.fetchAccountNames()
        return accounts

if __name__ == "__main__":
    pulseController = PulseController()



test = PulseController()
print(type(test.FetchAccountsForUpdateAccountPage()))


