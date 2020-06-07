import sqlite3
import requests
import os

db = 'C:\\Users\\kreilly\\Desktop\\Pulse\\backend\\database\\pulse.db'
conn = sqlite3.connect(db, check_same_thread=False)

test =  {"accountName":"Abbott","contractStart":"1/18/2020","contractEnd":"1/18/2021","softwareCost":"100000","researchServiceCost":"40000","creditsPurchased":"36","cmServiceCost":"12000","incentiveBudget":"12000","recruitmentBudget":"8000","accountManager":"Ken Reilly","communityManager":"Megan McCarthy","teamResponsible":"R&I","industry":"Medical Devices"}


class PulseDAO:
    def __init__(self):
        pass


    @staticmethod
    def add_new_account(new_account_form):
        c = conn.cursor()
        #First adding new account name and industry to the Account table
        c.execute(f"""
        INSERT INTO Accounts (account_name, industry, active_inactive)
        VALUES (
            '{new_account_form['accountName']}',
            '{new_account_form['industry']}',
            'TRUE'
        );
        """)

        #Need to pull the ID of the new account that was just inserted to link with AccountInformationTable
        get_new_id = c.lastrowid
        print(get_new_id)
        # new_account_id = get_new_id[0][0]

        #Then updating the Account Information Table
        c.execute(f"""
        INSERT INTO AccountInformation (account_id, contract_start, contract_end, software_cost, research_service_cost, research_credits, incentive_budget, recruitment_budget, account_lead, community_manager, team_responsible)
        VALUES (
            '{get_new_id}',
            '{new_account_form['contractStart']}',
            '{new_account_form['contractEnd']}',
            '{new_account_form['softwareCost']}',
            '{new_account_form['researchServiceCost']}',
            '{new_account_form['creditsPurchased']}',
            '{new_account_form['incentiveBudget']}',
            '{new_account_form['recruitmentBudget']}',
            '{new_account_form['accountManager']}',
            '{new_account_form['communityManager']}',
            '{new_account_form['teamResponsible']}'

        );
        """)
        conn.commit()
        c.close()
        return 'successfully appended to db'

    @staticmethod
    def fetchAccountNames():
        c = conn.cursor()
        #row_factory turns the list of tuples into a list
        c.row_factory = lambda cursor, row: row[0]
        #Getting all of the account names
        #eventually, this will need to be filtered for where active = True
        accounts = c.execute(f"""
        SELECT account_name FROM Accounts where active_inactive = 'TRUE';
        """
        ).fetchall()
        c.close()
        return accounts


        

test = PulseDAO()

test.fetchAccountNames()




