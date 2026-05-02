const gameData = {
    voter: {
        start: {
            speaker: 'system',
            text: 'Welcome to the Voter experience! The Election Commission of India (ECI) ensures free and fair elections. Your journey begins with Registration.',
            options: [
                { text: 'How do I register to vote?', next: 'registration_1', xp: 10 }
            ]
        },
        registration_1: {
            speaker: 'assistant',
            text: 'To vote in India, you must be 18 years old and an Indian citizen. You need to fill out **Form 6** online (NVSP portal) or offline to get your Voter ID (EPIC).',
            options: [
                { text: 'I am 18 and have filled Form 6. What\'s next?', next: 'registration_2', xp: 20 },
                { text: 'What if I moved to a new city?', next: 'registration_moved', xp: 15 }
            ]
        },
        registration_moved: {
            speaker: 'assistant',
            text: 'If you shifted your residence, you need to fill **Form 8** to shift your constituency. You cannot vote in two places!',
            options: [
                { text: 'Got it. My name is now on the voter list.', next: 'registration_2', xp: 10 }
            ]
        },
        registration_2: {
            speaker: 'assistant',
            text: 'Great! Your name is now on the Electoral Roll. Elections have been announced, and the Model Code of Conduct (MCC) is in place. Campaigns are starting.',
            options: [
                { text: 'How do I decide who to vote for?', next: 'campaign_1', xp: 15 }
            ]
        },
        campaign_1: {
            speaker: 'assistant',
            text: 'Look at the **Election Manifestos** (promises made by parties), the candidate\'s background (affidavits on criminal records/assets), and their past work. As a voter, you have the right to know this info.',
            options: [
                { text: 'I have made my decision. It is Election Day!', next: 'election_day', xp: 20 }
            ]
        },
        election_day: {
            speaker: 'assistant',
            text: 'It is Polling Day. You reach the polling booth. The polling officer checks your Voter ID and name on the list. Then, indelible ink is marked on your left index finger.',
            options: [
                { text: 'I am at the voting compartment. What do I do?', next: 'voting_evm', xp: 15 }
            ]
        },
        voting_evm: {
            speaker: 'assistant',
            text: 'You press the blue button next to your chosen candidate\'s symbol on the **EVM (Electronic Voting Machine)**. You will hear a loud "BEEP".',
            options: [
                { text: 'How do I know my vote was recorded correctly?', next: 'voting_vvpat', xp: 20 }
            ]
        },
        voting_vvpat: {
            speaker: 'assistant',
            text: 'You look at the **VVPAT (Voter Verifiable Paper Audit Trail)** machine next to the EVM. A paper slip with your candidate\'s symbol will be visible through the glass for 7 seconds before dropping into a sealed box.',
            options: [
                { text: 'Awesome! What happens after voting?', next: 'counting', xp: 10 }
            ]
        },
        counting: {
            speaker: 'assistant',
            text: 'The EVMs are sealed and kept in highly secure strong rooms guarded by central forces. On Counting Day, votes are tallied under strict ECI supervision.',
            options: [
                { text: 'Who forms the government?', next: 'results', xp: 10 }
            ]
        },
        results: {
            speaker: 'system',
            text: 'Congratulations! You completed the Voter Journey. The party or coalition with a majority of seats in the Lok Sabha (or Vidhan Sabha) forms the government. Every single vote counts in a democracy!',
            options: [
                { text: 'Start Over', next: 'start', role: 'voter', xp: 0 },
                { text: 'Try Candidate Role', next: 'start', role: 'candidate', xp: 0 }
            ]
        }
    },
    
    candidate: {
        start: {
            speaker: 'system',
            text: 'Welcome to the Candidate experience! Running for office is a huge responsibility governed by the **Representation of the People Act, 1951 (RP Act)**. Let\'s start with your nomination.',
            options: [
                { text: 'How do I file my nomination?', next: 'nomination_1', xp: 10 }
            ]
        },
        nomination_1: {
            speaker: 'assistant',
            text: 'You must be at least 25 years old (for Lok Sabha/MLA). Under Section 8 of the RP Act, you can be **disqualified** if convicted of certain offenses. If eligible, submit papers to the Returning Officer (RO).',
            options: [
                { text: 'Is that all I need to submit?', next: 'nomination_2', xp: 10 }
            ]
        },
        nomination_2: {
            speaker: 'assistant',
            text: 'No. The Supreme Court mandates that you must file an **Affidavit (Form 26)** declaring your criminal records, assets, liabilities, and educational qualifications. Transparency is key!',
            options: [
                { text: 'Papers filed! Can I start campaigning now?', next: 'campaign_1', xp: 20 }
            ]
        },
        campaign_1: {
            speaker: 'assistant',
            text: 'Your papers pass scrutiny! You are allotted an election symbol. You can now campaign, but you must strictly follow the **Model Code of Conduct (MCC)** and manage your budget carefully.',
            options: [
                { text: 'What is the Model Code of Conduct?', next: 'mcc_explained', xp: 15 },
                { text: 'How much money can I spend?', next: 'expenditure', xp: 15 }
            ]
        },
        expenditure: {
            speaker: 'assistant',
            text: 'The ECI sets strict **Election Expenditure Limits** (e.g., up to ₹95 Lakhs for Lok Sabha in larger states). You must maintain daily accounts and submit them within 30 days of results. Exceeding limits is a corrupt practice!',
            options: [
                { text: 'Got it. I will track my spending.', next: 'mcc_explained', xp: 10 }
            ]
        },
        mcc_explained: {
            speaker: 'assistant',
            text: 'The MCC prohibits using religion/caste for votes or using government machinery. Also, beware of **Paid News** (paying media to write favorable articles disguised as news). All political ads must be pre-certified by the Media Certification and Monitoring Committee (MCMC).',
            options: [
                { text: 'Understood. I will campaign ethically.', next: 'election_day', xp: 20 },
                { text: 'I\'ll pay a newspaper to print a glowing article about me.', next: 'paid_news_violation', xp: 5 }
            ]
        },
        paid_news_violation: {
            speaker: 'assistant',
            text: 'WARNING! **Paid News** is an electoral offense. The ECI actively monitors this. If caught, the cost is added to your election expenditure, potentially breaching your limit and leading to disqualification!',
            options: [
                { text: 'I apologize. I will stick to the rules.', next: 'election_day', xp: 5 }
            ]
        },
        election_day: {
            speaker: 'assistant',
            text: 'Campaigning ends 48 hours before polling (Silence Period). On Election Day, your designated polling agents sit inside booths to ensure fair voting and check the identity of voters.',
            options: [
                { text: 'Polling is over. When is the counting?', next: 'counting', xp: 15 }
            ]
        },
        counting: {
            speaker: 'assistant',
            text: 'Counting day arrives. EVMs are opened in the presence of candidates and their counting agents. If there are disputes, the RO resolves them. VVPAT slips from 5 random booths per constituency are tallied to verify EVMs.',
            options: [
                { text: 'Did I win?', next: 'results', xp: 20 }
            ]
        },
        results: {
            speaker: 'system',
            text: 'The Returning Officer declares the results. The candidate with the highest number of valid votes wins (First-Past-The-Post system). Whether you win or lose, participating is vital to democracy!',
            options: [
                { text: 'Start Over', next: 'start', role: 'candidate', xp: 0 },
                { text: 'Try Voter Role', next: 'start', role: 'voter', xp: 0 }
            ]
        }
    }
};
