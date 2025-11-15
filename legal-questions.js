// Comprehensive Legal Questions Database for Juliana

const legalQuestionsDatabase = {
    beginner: [
        {
            question: "What is the highest court in England and Wales?",
            options: ["High Court", "Court of Appeal", "Supreme Court", "Crown Court"],
            correct: 2,
            explanation: "The Supreme Court is the highest court in the UK, established in 2009."
        },
        {
            question: "What does 'actus reus' mean in criminal law?",
            options: ["Guilty mind", "Physical act", "Legal consequence", "Criminal intent"],
            correct: 1,
            explanation: "Actus reus refers to the physical element or conduct of a crime."
        },
        {
            question: "In contract law, what is consideration?",
            options: ["Thinking about terms", "Something of value exchanged", "Legal advice", "Written agreement"],
            correct: 1,
            explanation: "Consideration is something of value that each party gives to make the contract legally binding."
        },
        {
            question: "What is the standard of proof in criminal cases?",
            options: ["Balance of probabilities", "Beyond reasonable doubt", "Clear and convincing", "Preponderance of evidence"],
            correct: 1,
            explanation: "Criminal cases require proof beyond reasonable doubt, the highest standard of proof."
        },
        {
            question: "What is judicial precedent?",
            options: ["Judge's opinion", "Court procedure", "Binding legal principle from previous cases", "Jury decision"],
            correct: 2,
            explanation: "Judicial precedent means courts are bound by decisions made in higher courts in similar cases."
        },
        {
            question: "What does 'ultra vires' mean?",
            options: ["Beyond powers", "Very strong", "Extremely fast", "Above law"],
            correct: 0,
            explanation: "Ultra vires means 'beyond powers' - acting outside legal authority."
        },
        {
            question: "In tort law, what is negligence?",
            options: ["Intentional harm", "Breach of duty causing damage", "Criminal behavior", "Contract violation"],
            correct: 1,
            explanation: "Negligence is the breach of a duty of care that causes damage to another person."
        },
        {
            question: "What is the difference between civil and criminal law?",
            options: ["No difference", "Civil deals with disputes between individuals, criminal with offenses against state", "Civil is more serious", "Criminal is private"],
            correct: 1,
            explanation: "Civil law deals with disputes between individuals, while criminal law deals with offenses against the state."
        },
        {
            question: "What is a statute?",
            options: ["Court decision", "Legal principle", "Act of Parliament", "Judge's ruling"],
            correct: 2,
            explanation: "A statute is a written law passed by Parliament, also known as an Act of Parliament."
        },
        {
            question: "What does 'mens rea' mean?",
            options: ["Physical act", "Guilty mind", "Legal procedure", "Court hearing"],
            correct: 1,
            explanation: "Mens rea refers to the mental element or guilty mind required for most crimes."
        }
    ],
    intermediate: [
        {
            question: "In Donoghue v Stevenson, what legal principle was established?",
            options: ["Strict liability", "The neighbour principle", "Absolute liability", "Vicarious liability"],
            correct: 1,
            explanation: "The neighbour principle established the modern law of negligence - you must take reasonable care to avoid acts likely to injure your neighbour."
        },
        {
            question: "What is the 'but for' test in negligence?",
            options: ["Test for duty of care", "Test for factual causation", "Test for damages", "Test for breach"],
            correct: 1,
            explanation: "The 'but for' test asks: 'but for the defendant's actions, would the damage have occurred?' It establishes factual causation."
        },
        {
            question: "In contract law, what makes an offer different from an invitation to treat?",
            options: ["Nothing", "Offers are binding when accepted, invitations are not", "Offers are written", "Invitations are verbal"],
            correct: 1,
            explanation: "An offer creates legal relations when accepted, while an invitation to treat merely invites offers."
        },
        {
            question: "What is the postal rule in contract law?",
            options: ["Contracts must be posted", "Acceptance is effective when posted", "Offers expire after posting", "All contracts need postal confirmation"],
            correct: 1,
            explanation: "The postal rule states that acceptance is effective when posted, not when received."
        },
        {
            question: "What is vicarious liability?",
            options: ["Personal liability", "Liability for another's actions", "Criminal liability", "Contractual liability"],
            correct: 1,
            explanation: "Vicarious liability makes one person liable for the wrongful acts of another, typically employers for employees."
        },
        {
            question: "In criminal law, what is the difference between murder and manslaughter?",
            options: ["No difference", "Intent to kill", "Weapon used", "Location of crime"],
            correct: 1,
            explanation: "Murder requires intent to kill or cause grievous bodily harm, while manslaughter does not require this specific intent."
        },
        {
            question: "What is the doctrine of privity of contract?",
            options: ["Contracts must be private", "Only parties to contract can sue on it", "Contracts need witnesses", "All contracts are confidential"],
            correct: 1,
            explanation: "Privity of contract means only parties to a contract can sue or be sued on it (with some exceptions)."
        },
        {
            question: "What is judicial review?",
            options: ["Courts reviewing other courts", "Courts reviewing legality of public body decisions", "Judges reviewing themselves", "Public reviewing judges"],
            correct: 1,
            explanation: "Judicial review allows courts to examine the lawfulness of decisions made by public bodies."
        },
        {
            question: "What is the difference between void and voidable contracts?",
            options: ["No difference", "Void contracts never existed, voidable can be cancelled", "Void are criminal, voidable are civil", "Voidable are more serious"],
            correct: 1,
            explanation: "Void contracts are treated as never having existed, while voidable contracts exist until cancelled by one party."
        },
        {
            question: "What is novus actus interveniens?",
            options: ["New legal action", "Intervening act breaking chain of causation", "Novel legal principle", "Type of damages"],
            correct: 1,
            explanation: "Novus actus interveniens is an intervening act that breaks the chain of causation between the defendant's act and the damage."
        }
    ],
    advanced: [
        {
            question: "In Caparo v Dickman, what three-stage test was established for duty of care?",
            options: ["Foreseeability, proximity, fair/just/reasonable", "Duty, breach, causation", "Offer, acceptance, consideration", "Actus reus, mens rea, causation"],
            correct: 0,
            explanation: "Caparo established the three-stage test: foreseeability of harm, proximity of relationship, and whether it's fair, just and reasonable to impose a duty."
        },
        {
            question: "What is the rule in Rylands v Fletcher?",
            options: ["Negligence standard", "Strict liability for escape of dangerous things", "Contract formation", "Criminal liability"],
            correct: 1,
            explanation: "Rylands v Fletcher establishes strict liability for the escape of things likely to do mischief if they escape from land."
        },
        {
            question: "In constitutional law, what is parliamentary sovereignty?",
            options: ["Parliament controls courts", "Parliament can make/unmake any law", "Parliament is elected", "Parliament makes policy"],
            correct: 1,
            explanation: "Parliamentary sovereignty means Parliament has unlimited legislative power and can make or unmake any law."
        },
        {
            question: "What is the difference between legal and equitable remedies?",
            options: ["No difference", "Legal remedies are monetary, equitable are discretionary", "Legal are criminal, equitable civil", "Equitable are stronger"],
            correct: 1,
            explanation: "Legal remedies (like damages) are available as of right, while equitable remedies (like injunctions) are discretionary."
        },
        {
            question: "What is the doctrine of legitimate expectation?",
            options: ["Right to expect fairness", "Expectation of legal representation", "Right to fair trial", "Expectation of compensation"],
            correct: 0,
            explanation: "Legitimate expectation protects individuals who reasonably expect a public body to act in a certain way based on previous conduct or promises."
        },
        {
            question: "In land law, what is the difference between legal and equitable interests?",
            options: ["No difference", "Legal interests bind world, equitable bind those with notice", "Legal are stronger", "Equitable are permanent"],
            correct: 1,
            explanation: "Legal interests generally bind the whole world, while equitable interests typically only bind those with notice of them."
        },
        {
            question: "What is the rule against perpetuities?",
            options: ["No permanent contracts", "Future interests must vest within perpetuity period", "No life estates", "All trusts must end"],
            correct: 1,
            explanation: "The rule against perpetuities requires that future interests in property must vest (if at all) within the perpetuity period."
        },
        {
            question: "In company law, what are directors' fiduciary duties?",
            options: ["Financial duties only", "Duties of loyalty and care to company", "Duties to shareholders only", "Duties to creditors only"],
            correct: 1,
            explanation: "Directors owe fiduciary duties of loyalty and care to the company, including avoiding conflicts of interest and acting in the company's best interests."
        },
        {
            question: "What is the difference between express and resulting trusts?",
            options: ["No difference", "Express trusts are intentionally created, resulting trusts arise by operation of law", "Express are stronger", "Resulting are permanent"],
            correct: 1,
            explanation: "Express trusts are intentionally created by settlors, while resulting trusts arise by operation of law when beneficial ownership is unclear."
        },
        {
            question: "In EU law, what is the principle of direct effect?",
            options: ["EU law applies directly", "EU law creates individual rights enforceable in national courts", "EU law overrides national law", "EU law is supreme"],
            correct: 1,
            explanation: "Direct effect means EU law provisions can create individual rights that are enforceable in national courts without need for implementing legislation."
        }
    ],
    expert: [
        {
            question: "In White v Jones, what principle was established regarding solicitors' liability?",
            options: ["No liability to third parties", "Liability to intended beneficiaries for negligent will preparation", "Absolute liability", "Limited liability"],
            correct: 1,
            explanation: "White v Jones established that solicitors can owe a duty of care to intended beneficiaries when negligently preparing wills, extending the Hedley Byrne principle."
        },
        {
            question: "What is the doctrine of proprietary estoppel?",
            options: ["Contract principle", "Prevents denial of property rights where detrimental reliance occurred", "Criminal defense", "Company law principle"],
            correct: 1,
            explanation: "Proprietary estoppel prevents a landowner from denying another's property rights where that person has relied to their detriment on assurances about the land."
        },
        {
            question: "In Salomon v Salomon, what principle of company law was established?",
            options: ["Directors' duties", "Separate legal personality", "Shareholder rights", "Company formation"],
            correct: 1,
            explanation: "Salomon v Salomon established that a properly formed company has separate legal personality distinct from its shareholders."
        },
        {
            question: "What is the rule in Foss v Harbottle?",
            options: ["Majority rule in companies", "Individual shareholders cannot sue for wrongs to company", "Directors' duties", "Company meetings"],
            correct: 1,
            explanation: "The rule in Foss v Harbottle prevents individual shareholders from suing for wrongs done to the company - the company itself must sue."
        },
        {
            question: "In human rights law, what is the margin of appreciation?",
            options: ["Court's discretion", "State's discretion in implementing rights", "Individual's choice", "Legal interpretation method"],
            correct: 1,
            explanation: "The margin of appreciation allows states some discretion in how they implement human rights obligations, recognizing cultural and legal differences."
        },
        {
            question: "What is the difference between mandatory and directory statutory requirements?",
            options: ["No difference", "Mandatory must be complied with exactly, directory allows substantial compliance", "Mandatory are criminal, directory civil", "Directory are stronger"],
            correct: 1,
            explanation: "Mandatory requirements must be complied with exactly or the act is invalid, while directory requirements allow substantial compliance."
        },
        {
            question: "In administrative law, what is the Wednesbury unreasonableness test?",
            options: ["Reasonableness standard", "Decision so unreasonable no reasonable authority would make it", "Procedural fairness test", "Natural justice principle"],
            correct: 1,
            explanation: "Wednesbury unreasonableness means a decision is so unreasonable that no reasonable public authority could have made it."
        },
        {
            question: "What is the doctrine of res ipsa loquitur?",
            options: ["The thing speaks for itself - inference of negligence", "Legal representation required", "Court procedure", "Evidence rule"],
            correct: 0,
            explanation: "Res ipsa loquitur ('the thing speaks for itself') allows inference of negligence where the accident wouldn't normally happen without negligence."
        },
        {
            question: "In trust law, what is the rule in Saunders v Vautier?",
            options: ["Trustee duties", "Beneficiaries can collapse trust if all adult and entitled", "Trust formation", "Trust property rules"],
            correct: 1,
            explanation: "The rule in Saunders v Vautier allows beneficiaries to collapse a trust if they are all adults, of sound mind, and absolutely entitled to the trust property."
        },
        {
            question: "What is the difference between common law and equity?",
            options: ["No difference", "Common law provides legal remedies, equity provides discretionary remedies", "Common law is older", "Equity is stronger"],
            correct: 1,
            explanation: "Common law developed through court decisions and provides legal remedies, while equity developed to provide fairness and discretionary remedies where common law was inadequate."
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = legalQuestionsDatabase;
}