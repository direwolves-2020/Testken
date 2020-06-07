from .pulse_entities import AccountEntity
from .pulse_entities import MemberEngagementEntity
from .pulse_entities import AccountInformationEntity
from .pulse_entities import ClientUtilizationEntity

import json
import pandas as pd
from datetime import datetime
import datetime





#Data Cleaning Service Class performs the business logic of cleaning files
class DataCleaningService:
    def __init__(self):
        self.memberExport = None #DataFrame
        self.memberParticipation = None #DataFrame
        self.memberRedemption = None #DataFrame
        self.accountEntity = AccountEntity(member_engagement = MemberEngagementEntity(), account_information= AccountInformationEntity, client_utilization=ClientUtilizationEntity())

    #This is the master function for creating a new account in the dashboard
    def create_new_account(self,MX,MP,MR):
        #First step: load files, clean, and add to state
        self.load_and_clean_files_and_add_to_state(MX,MP,MR)
        #second step: get active/inactive/closed/deleted breakout
        self.get_active_inactive_breakout()
        #third step: inactive members
        self.inactive_levels()
        #fourth step: points earned
        self.points_earned()
        #fifth step: points redeemed
        self.points_redeemed()
        #sixth step: average action numerator
        self.average_action_numerator_and_denominator()
        return AccountEntity


        




    #for now, this takes the NAMES of the files and puts them all dataframes in state
    #This is re-usable for both creating and updating accounts
    def load_and_clean_files_and_add_to_state(self,MX,MP,MR):
        #First making sure integers dont have floating points
        pd.set_option('precision',0)
        #Then Loading Data Files
        #########note: Will need to re-visit this section 
        self.memberParticipation= pd.ExcelFile(MP)
        self.memberRedemption = pd.read_excel(MR, sheet_name ='Redemptions')        
        #Cleaning Member Export and adding to state
        member_export = pd.read_excel(MX)
        self.memberExport = member_export.loc[(member_export['Activated'] == True) 
                                        & (member_export['Email Valid'] == True) 
                                        & (member_export['Test Account'] == False) 
                                        & (member_export['User Role'] == 'MEMBER')]

    def get_active_inactive_breakout(self):
        #Active inactive closed deleted breakout. using sort_index to ensure consistent output
        AICDbreakout = self.memberExport['Status'].value_counts().sort_index()
        self.accountEntity.memberEngagementEntity.active = AICDbreakout[0]
        self.accountEntity.memberEngagementEntity.inactive = AICDbreakout[3]
        self.accountEntity.memberEngagementEntity.closed = AICDbreakout[1]
        self.accountEntity.memberEngagementEntity.deleted = AICDbreakout[2]

    def inactive_levels(self):
        #Today is a variable used to calculate the difference from member last login to today
        today = datetime.date.today()

        #First filtering my member export to get the 'Last Login Date' of Inactive Members
        last_login_date_list = self.memberExport.loc[(self.memberExport['Status'] == 'INACTIVE')]['Last Login Date']
        #slicing the row just to get the date and 
        last_login_date_list = [x[0:10] for x in last_login_date_list]
        #Converting to 'date' data type
        last_login_date_list = [datetime.datetime.strptime(x,'%m/%d/%Y').date() for x in last_login_date_list]
        
        #This performs the calcualtion of subtracting today and the last login date, returning a list of integers
        calculation = [(today - x).days for x in last_login_date_list]
        #with the calculation, we set the values of inactive levels in their respective buckets
        self.accountEntity.memberEngagementEntity.Level_1_Inactive = len([x for x in calculation if x >= 30 and x <= 44])
        self.accountEntity.memberEngagementEntity.Level_2_Inactive = len([x for x in calculation if x >= 45 and x <= 59])
        self.accountEntity.memberEngagementEntity.Level_3_Inactive = len([x for x in calculation if x >= 60 and x <= 74])
        self.accountEntity.memberEngagementEntity.Level_4_Inactive = len([x for x in calculation if x >= 75 and x <= 89])
        

    def points_earned(self):
        #Opening up the 'Points Earned Sheet' in the member participation
        points_earned_sheet = pd.read_excel(self.memberParticipation, 'Points Earned')
        #Getting the sum of the 'Points Earned Column and appending to state
        self.accountEntity.clientUtilizationEntity.incentivesDistributedByMonth = points_earned_sheet['Points Earned'].sum()

    def points_redeemed(self):
        #member Redemption only uses one sheet, so we head into the member redemption, access the reward column, slice the values out of the string. 
        #Some values are 2 digits, so there is if/else logic in there to address it. 
        self.accountEntity.clientUtilizationEntity.incentivesRedeemedByMonth = sum([int(x[1:2]) if x[0:2] == '$5' else int(x[1:3]) for x in self.memberRedemption['Reward']])

    def average_action_numerator_and_denominator(self):
        #Opening the 'Export Summary' sheet for the numerator
        member_participation_summary_sheet = pd.read_excel(self.memberParticipation, 'Export Summary')
        #This is the sheet for the denominator
        member_participation_counts_sheet = pd.read_excel(self.memberParticipation, 'Member Participation Counts')
        #This is simply picking out each metric based on its location in the sheet
        self.accountEntity.memberEngagementEntity.logins = int(member_participation_summary_sheet.iloc[2,1])
        self.accountEntity.memberEngagementEntity.comments = int(member_participation_summary_sheet.iloc[3,1])
        self.accountEntity.memberEngagementEntity.surveysCompleted = int(member_participation_summary_sheet.iloc[4,1])
        self.accountEntity.memberEngagementEntity.quickPollsCompleted = int(member_participation_summary_sheet.iloc[5,1])
        self.accountEntity.memberEngagementEntity.filesUploaded = int(member_participation_summary_sheet.iloc[8,1])
        #Sums up everyhing above aside from logins to get the action numerator
        self.accountEntity.memberEngagementEntity.avgActionNumerator = (self.accountEntity.memberEngagementEntity.comments + self.accountEntity.memberEngagementEntity.surveysCompleted + self.accountEntity.memberEngagementEntity.quickPollsCompleted + self.accountEntity.memberEngagementEntity.filesUploaded)
        #Denominator is sum of everyone from the 'Member Participation counts' sheet 
        self.accountEntity.memberEngagementEntity.avgActionDenominator = len(member_participation_counts_sheet['Username'])
        #Below divides numerator by denominator
        self.accountEntity.memberEngagementEntity.avgActionPerMember = round((self.accountEntity.memberEngagementEntity.avgActionNumerator / self.accountEntity.memberEngagementEntity.avgActionDenominator), 2)
    





        

#####################################################################################################################################
###########Ensuring that 
test = DataCleaningService()


# test.create_new_account(MX='March HF LOB.xlsx', MP= 'March Member Participation.xlsx', MR= 'March Member Redemption.xlsx')
# print(test)


# print(json.dumps(test.accountEntity.__dict__, default = lambda o: o.__dict__, indent=4))

######################################## This was used in the beginning to visualize what my JSON will look like
# mem_eng = MemberEngagementEntity()
# acc_inf = AccountInformationEntity()
# client_util = ClientUtilizationEntity()
# test = AccountEntity(mem_eng, acc_inf, client_util)
# print(json.dumps(test.__dict__, default = lambda o: o.__dict__, indent=4))
