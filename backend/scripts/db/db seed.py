import sqlite3
import pandas as pd

db = 'pulse.db'

conn = sqlite3.connect(db)
c = conn.cursor()
conn.execute(
	"""
	CREATE TABLE Accounts (
		account_id INTEGER PRIMARY KEY,
		account_name TEXT, 
		industry TEXT,
		active_inactive TEXT
	);""")

conn.execute(
    """
	CREATE TABLE MemberEngagement (
		member_engagement_id INTEGER PRIMARY KEY,
		account_id INTEGER,
		date TEXT,
		active_members INTEGER,
        inactive_members INTEGER,
        closed_members INTEGER,
        deleted_members INTEGER,
        level_1_inactive INTEGER,
        level_2_inactive INTEGER,
        level_3_inactive INTEGER,
        level_4_inactive INTEGER,
        member_login_count INTEGER,
        member_comment_count INTEGER,
        member_surveys_completed INTEGER,
        member_files_uploaded INTEGER,
        member_quick_polls_completed INTEGER,
        average_action_numerator INTEGER,
        average_action_denominator INTEGER,
        average_action_per_member INTEGER
	); """)


conn.execute(
	"""
	CREATE TABLE ClientUtilization (
		client_utilization_id INTEGER PRIMARY KEY,
        account_id INTEGER,
		month INTEGER, 
		year INTEGER,
		research_credits_used INTEGER,
        incentives_distributed INTEGER,
        incentives_redeemed INTEGER,
        recruitment_budget_spent INTEGER,
        research_credits_remaining INTEGER,
        incentive_budget_remaining INTEGER,
        recruitment_budget_remaining INTEGER,
        event_credit_upsell TEXT,
        event_fcx_purchase TEXT,
        event_qbr TEXT,
        event_new_cm TEXT,
        event_new_account_lead TEXT,
        event_new_client_stakeholder TEXT
	);""")

conn.execute(
	"""
	CREATE TABLE AccountInformation (
		account_information_id INTEGER PRIMARY KEY,
        account_id INTEGER,
		contract_start DATE,
        contract_end DATE,
        software_cost INTEGER,
        research_service_cost INTEGER,
        research_credits INTEGER,
        incentive_budget INTEGER,
        recruitment_budget INTEGER,
        account_lead TEXT,
        community_manager TEXT,
        team_responsible TEXT
	);""")



conn.commit()





# #############################################################################
# #Seeding

# df = pd.read_csv('TourneySeeds.csv')

# #I first need to split this seed column to the different brackets -- ('[0-9]') regex also works
# new = df['Seed'].str.split(pat = '(\d+)',n = 1, expand = True)
# #Needed to include these two steps because 'new' was making 3 columns. the third column was empty whitespace and I couldn't figure out why it was happening or how to avoid it
# df['bracket'] = new[0]
# df['seed'] = new[1]
# #deleting unused & old columns
# df.drop(columns = ['Seed', 'Team'], inplace = True)

# #reading dataframe into database
# for index, row in df.iterrows():
# 	c.execute(
# 		"""
# 		INSERT INTO Team ("year", "bracket", "seed")
# 		VALUES (?, ?, ?)
# 		""",(row['Season'], row['bracket'], row['seed'])
# 	)
# conn.commit()
# conn.close()

# print("Your database named", db, "was succesfully created")