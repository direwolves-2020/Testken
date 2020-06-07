import json
import pandas as pd
from datetime import datetime
import datetime


class MemberEngagementEntity:
    def __init__(self):
        self.dateCaptured = 0 
        self.totalMembers = 0
        self.active = 0
        self.inactive = 0 
        self.closed = 0
        self.Level_1_Inactive = 0
        self.Level_2_Inactive = 0
        self.Level_3_Inactive = 0
        self.Level_4_Inactive = 0
        self.logins = 0
        self.comments = 0
        self.surveysCompleted = 0
        self.filesUploaded = 0
        self.quickPollsCompleted = 0
        self.avgActionNumerator = 0
        self.avgActionDenominator = 0
        self.avgActionPerMember = 0



class AccountInformationEntity:
    def __init__(self):
        self.datesCaptured = 0
        self.contractStartDate = '07/11/2020'
        self.contractEndDate = '07/11/2020'
        self.softwareCost = 100000
        self.researchServiceCost = 0
        self.communityServiceCost = 0
        self.startingCreditsBudget = 0
        self.startingIncentivesBudget = 0
        self.startingRecruitmentBudget = 0
        self.accountManager = 'Ken Reilly'
        self.communityManager = 'Sally Page'
        self.accountType = 'Self Service'
        self.industry = 'industry name'


class ClientUtilizationEntity:
    def __init__(self):
        self.researchCreditsUsed = 0
        self.lifetimeIncentivesDistributed = 0
        self.lifetimeIncentivesRedeemed = 0
        self.incentivesDistributedByMonth = []
        self.incentivesRedeemedByMonth = []



class AccountEntity:    
    def __init__(self,member_engagement, account_information, client_utilization):
        self.name = 'Account Name'
        self.id = None
        
        self.clientUtilizationEntity = client_utilization
        self.memberEngagementEntity = member_engagement
        self.accountInformationEntity = account_information #This needs to be required when a new instance is made



