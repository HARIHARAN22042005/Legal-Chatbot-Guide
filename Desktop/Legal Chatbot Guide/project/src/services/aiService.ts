// AI Service for Legal Chatbot
// Supports multiple AI providers with fallback to enhanced rule-based responses

interface AIResponse {
  content: string;
  reference: string;
  confidence: number;
}

interface LegalContext {
  jurisdiction: string;
  area: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
}

class AIService {
  private openaiApiKey: string | null;
  private hasAIProvider: boolean;

  constructor() {
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.hasAIProvider = this.openaiApiKey !== null && this.openaiApiKey !== 'your-openai-api-key-here';
  }

  async getLegalResponse(userMessage: string, context?: LegalContext): Promise<AIResponse> {
    // Try AI provider first if available
    if (this.hasAIProvider && this.openaiApiKey) {
      try {
        return await this.getOpenAIResponse(userMessage, context);
      } catch (error) {
        console.warn('AI provider failed, falling back to enhanced responses:', error);
      }
    }

    // Fallback to enhanced rule-based responses
    return this.getEnhancedResponse(userMessage, context);
  }

  private async getOpenAIResponse(userMessage: string, context?: LegalContext): Promise<AIResponse> {
    const legalKnowledgeBase = `
COMPREHENSIVE INDIAN LEGAL KNOWLEDGE BASE:

CRIMINAL LAW:
- Indian Penal Code (IPC) 1860: Sections 1-511 covering all offenses
- Code of Criminal Procedure (CrPC) 1973: Investigation, trial, appeals
- Evidence Act 1872: Admissibility, burden of proof, witness examination
- Juvenile Justice Act 2015: Crimes by minors
- Protection of Children from Sexual Offences (POCSO) Act 2012
- Narcotic Drugs and Psychotropic Substances (NDPS) Act 1985

CIVIL LAW:
- Indian Contract Act 1872: Formation, performance, breach, remedies
- Sale of Goods Act 1930: Transfer of property in goods
- Transfer of Property Act 1882: Immovable property transactions
- Registration Act 1908: Document registration requirements
- Limitation Act 1963: Time limits for legal actions
- Specific Relief Act 1963: Equitable remedies

CONSTITUTIONAL LAW:
- Constitution of India 1950: Fundamental Rights (Articles 12-35)
- Directive Principles (Articles 36-51): State policy guidelines
- Fundamental Duties (Article 51A): Citizen obligations
- Emergency Provisions (Articles 352-360): National, state, financial emergency
- Amendment Procedure (Article 368): Constitutional changes
- Judicial Review: Supreme Court and High Court powers

FAMILY LAW:
- Hindu Marriage Act 1955: Marriage, divorce, maintenance
- Hindu Succession Act 1956: Inheritance, coparcenary rights
- Muslim Personal Law: Marriage, divorce, inheritance
- Indian Christian Marriage Act 1872: Christian marriages
- Special Marriage Act 1954: Inter-religious marriages
- Protection of Women from Domestic Violence Act 2005

COMMERCIAL LAW:
- Companies Act 2013: Corporate governance, compliance
- Partnership Act 1932: Partnership formation, dissolution
- Limited Liability Partnership Act 2008: LLP structure
- Insolvency and Bankruptcy Code 2016: Corporate insolvency
- Competition Act 2002: Anti-monopoly, fair trade
- Foreign Exchange Management Act (FEMA) 1999

LABOR LAW:
- Industrial Disputes Act 1947: Strike, lockout, retrenchment
- Factories Act 1948: Working conditions, safety
- Minimum Wages Act 1948: Wage protection
- Employees' Provident Fund Act 1952: Social security
- Payment of Gratuity Act 1972: Terminal benefits
- Sexual Harassment of Women at Workplace Act 2013

PROPERTY LAW:
- Indian Easements Act 1882: Rights over property
- Land Acquisition Act 2013: Government acquisition
- Real Estate (Regulation and Development) Act 2016: RERA compliance
- Benami Transactions (Prohibition) Act 1988: Benami property
- Urban Land (Ceiling and Regulation) Act 1976: Land ceiling

TAXATION LAW:
- Income Tax Act 1961: Direct taxation
- Goods and Services Tax (GST) Act 2017: Indirect taxation
- Customs Act 1962: Import/export duties
- Central Excise Act 1944: Manufacturing taxes
- Wealth Tax Act 1957: Asset taxation

CYBER LAW:
- Information Technology Act 2000: Cyber crimes, digital signatures
- Personal Data Protection Bill: Privacy rights
- Intermediary Guidelines 2021: Social media compliance

ENVIRONMENTAL LAW:
- Environment Protection Act 1986: Pollution control
- Water (Prevention and Control of Pollution) Act 1974
- Air (Prevention and Control of Pollution) Act 1981
- Forest Conservation Act 1980: Forest protection
- Wildlife Protection Act 1972: Biodiversity conservation

CONSUMER LAW:
- Consumer Protection Act 2019: Consumer rights, grievance redressal
- Food Safety and Standards Act 2006: Food quality
- Bureau of Indian Standards Act 2016: Product standards

INTELLECTUAL PROPERTY:
- Patents Act 1970: Invention protection
- Copyright Act 1957: Creative work protection
- Trade Marks Act 1999: Brand protection
- Designs Act 2000: Industrial design protection
- Geographical Indications Act 1999: Regional product protection

BANKING & FINANCE:
- Banking Regulation Act 1949: Banking operations
- Reserve Bank of India Act 1934: Central banking
- Securitisation and Reconstruction of Financial Assets Act 2002: Asset recovery
- Payment and Settlement Systems Act 2007: Digital payments
- Credit Information Companies Act 2005: Credit reporting

IMPORTANT LEGAL PRINCIPLES:
- Natural Justice: Audi alteram partem, nemo judex in causa sua
- Rule of Law: Equality before law, legal certainty
- Separation of Powers: Legislative, executive, judicial independence
- Judicial Precedent: Stare decisis, binding nature of Supreme Court decisions
- Constitutional Supremacy: Constitution as supreme law
- Fundamental Rights: Enforceable against state and individuals
`;

    const systemPrompt = `You are an expert Indian legal assistant with comprehensive knowledge of Indian law. Use the provided legal knowledge base to give accurate, detailed legal guidance.

LEGAL KNOWLEDGE BASE:
${legalKnowledgeBase}

RESPONSE GUIDELINES:
1. Provide specific legal references (Act, Section, Article numbers)
2. Explain legal concepts in simple, understandable language
3. Include relevant case law principles where applicable
4. Mention procedural requirements and timelines
5. Highlight rights, remedies, and legal options available
6. Always include appropriate legal disclaimers
7. Suggest when to consult specific types of lawyers
8. Consider practical implications and real-world application

RESPONSE STRUCTURE:
- Direct answer to the question
- Relevant legal provisions and sections
- Procedural steps if applicable
- Rights and remedies available
- Practical considerations
- Professional consultation recommendation

Context: ${context ? `Jurisdiction: ${context.jurisdiction}, Area: ${context.area}, Complexity: ${context.complexity}` : 'General legal inquiry'}

Always emphasize that this is general legal information and specific legal advice should be sought from qualified legal professionals.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';

    return {
      content: aiContent,
      reference: 'AI-Generated Legal Guidance with Indian Law Database',
      confidence: 0.9
    };
  }

  private getEnhancedResponse(userMessage: string, context?: LegalContext): AIResponse {
    const legalDatabase = {
      // Criminal Law - Expanded
      'bail': {
        content: 'Bail is a legal mechanism allowing an accused person to be temporarily released from custody while awaiting trial. Under Indian law:\n\n• **Bailable Offenses**: Bail is generally a right (Sections 436-437, CrPC)\n• **Non-bailable Offenses**: Bail is at court\'s discretion (Section 437, CrPC)\n• **Factors Considered**: Severity of crime, flight risk, evidence tampering likelihood, criminal history\n• **Types**: Regular bail, anticipatory bail, interim bail\n\n**Anticipatory Bail**: Under Section 438 CrPC, can be granted before arrest in non-bailable cases.\n**Bail Conditions**: Court may impose conditions like surrender passport, regular reporting, not leaving jurisdiction.\n**Cancellation**: Bail can be cancelled under Section 437(5) if conditions are violated.\n\n**Important**: Bail conditions must be reasonable and not punitive in nature.',
        reference: 'Code of Criminal Procedure, 1973 - Sections 436-450',
        keywords: ['bail', 'custody', 'release', 'surety', 'anticipatory']
      },
      'fir': {
        content: 'First Information Report (FIR) is the first step in criminal justice process:\n\n• **Definition**: Written document prepared by police upon receiving information about a cognizable offense\n• **Filing**: Can be filed at any police station, regardless of jurisdiction\n• **Rights**: Free copy must be provided to informant\n• **Timeline**: Should be registered immediately upon receiving complaint\n• **Contents**: Date, time, place, nature of offense, details of complainant\n\n**Zero FIR**: Can be filed at any police station and later transferred to appropriate jurisdiction.',
        reference: 'Code of Criminal Procedure, 1973 - Section 154',
        keywords: ['fir', 'first information report', 'police', 'complaint', 'cognizable']
      },
      'ipc 302': {
        content: 'IPC Section 302 - Punishment for Murder:\n\n• **Definition**: Causing death with intention to cause death or knowledge that act is likely to cause death\n• **Punishment**: Death penalty OR life imprisonment + fine\n• **Elements**: \n  - Intention to cause death\n  - Knowledge that act is likely to cause death\n  - Act causes death\n• **Distinction**: Different from culpable homicide (IPC 304)\n• **Exceptions**: Self-defense, sudden provocation (may reduce to culpable homicide)\n\n**Note**: Death penalty is awarded only in "rarest of rare" cases.',
        reference: 'Indian Penal Code, 1860 - Section 302',
        keywords: ['murder', '302', 'death', 'intention', 'homicide']
      },
      'contract': {
        content: 'Contract Law under Indian Contract Act, 1872:\n\n• **Essential Elements**:\n  1. Offer and Acceptance\n  2. Consideration\n  3. Capacity to contract\n  4. Free consent\n  5. Lawful object\n  6. Not expressly declared void\n\n• **Types**: Express, implied, quasi-contracts\n• **Breach Remedies**: Damages, specific performance, injunction\n• **Void vs Voidable**: Void contracts are invalid from beginning; voidable can be cancelled by one party\n\n**Key Principle**: "Pacta sunt servanda" - agreements must be kept.',
        reference: 'Indian Contract Act, 1872 - Sections 10, 11, 73',
        keywords: ['contract', 'agreement', 'offer', 'acceptance', 'consideration']
      },
      'divorce': {
        content: 'Divorce in India - Multiple Personal Laws Apply:\n\n• **Hindu Marriage Act, 1955**: Mutual consent, cruelty, desertion, conversion, mental disorder\n• **Muslim Personal Law**: Talaq, Mubarat, Khula\n• **Indian Christian Marriage Act**: Adultery, cruelty, desertion\n• **Special Marriage Act**: Secular marriages\n\n• **Grounds**: Adultery, cruelty, desertion (2+ years), conversion, mental disorder, communicable disease\n• **Mutual Consent**: 6-month cooling period mandatory\n• **Maintenance**: Wife, children may be entitled to maintenance\n\n**Recent**: Triple Talaq criminalized in 2019.',
        reference: 'Hindu Marriage Act 1955, Muslim Personal Law, Special Marriage Act 1954',
        keywords: ['divorce', 'marriage', 'separation', 'talaq', 'mutual consent']
      },
      'property': {
        content: 'Property Law in India:\n\n• **Types**: Movable vs Immovable, Tangible vs Intangible\n• **Transfer**: Sale, gift, lease, mortgage, exchange\n• **Registration**: Mandatory for immovable property above ₹100\n• **Inheritance**: Hindu Succession Act, Muslim Personal Law, Indian Succession Act\n\n• **Key Acts**:\n  - Transfer of Property Act, 1882\n  - Registration Act, 1908\n  - Hindu Succession Act, 1956\n\n• **Women\'s Rights**: Equal inheritance rights under Hindu Succession (Amendment) Act, 2005\n\n**Tip**: Always verify title documents and get property surveyed before purchase.',
        reference: 'Transfer of Property Act 1882, Registration Act 1908',
        keywords: ['property', 'real estate', 'transfer', 'inheritance', 'registration']
      },

      // Additional Criminal Law
      'cybercrime': {
        content: 'Cyber Crimes under Information Technology Act, 2000:\n\n• **Section 43**: Damage to computer systems - Compensation up to ₹1 crore\n• **Section 66**: Computer related offenses - Imprisonment up to 3 years + fine up to ₹5 lakh\n• **Section 66A**: Sending offensive messages (Struck down by Supreme Court in 2015)\n• **Section 66B**: Dishonestly receiving stolen computer resource\n• **Section 66C**: Identity theft - Imprisonment up to 3 years + fine up to ₹1 lakh\n• **Section 66D**: Cheating by personation using computer resource\n• **Section 66E**: Violation of privacy - Publishing private images without consent\n• **Section 67**: Publishing obscene material in electronic form\n• **Section 67A**: Publishing sexually explicit material\n• **Section 67B**: Child pornography\n\n**Reporting**: Cyber crimes can be reported at www.cybercrime.gov.in or local cyber cell.',
        reference: 'Information Technology Act, 2000 - Sections 43, 66-67B',
        keywords: ['cyber', 'cybercrime', 'hacking', 'identity theft', 'online fraud', 'it act']
      },

      'dowry': {
        content: 'Dowry Laws in India:\n\n• **Dowry Prohibition Act, 1961**: Makes giving, taking, or demanding dowry illegal\n• **Section 498A IPC**: Cruelty by husband or relatives - Imprisonment up to 3 years\n• **Section 304B IPC**: Dowry death - Imprisonment for 7 years to life\n• **Section 113B Evidence Act**: Presumption of dowry death if woman dies within 7 years of marriage\n\n• **Penalties**:\n  - Giving/taking dowry: Imprisonment up to 5 years + fine up to ₹15,000\n  - Demanding dowry: Imprisonment up to 2 years + fine up to ₹10,000\n\n• **Protection**: Women can file complaints at police station or women\'s helpline (181)\n• **Legal Aid**: Free legal aid available under Legal Services Authorities Act\n\n**Important**: Dowry includes cash, goods, property given before, during, or after marriage.',
        reference: 'Dowry Prohibition Act 1961, IPC Sections 498A, 304B',
        keywords: ['dowry', 'dowry death', '498a', 'domestic violence', 'cruelty']
      },

      // Commercial Law Expansion
      'gst': {
        content: 'Goods and Services Tax (GST) in India:\n\n• **Structure**: One Nation, One Tax system replacing multiple indirect taxes\n• **Types**: CGST (Central), SGST (State), IGST (Integrated), UTGST (Union Territory)\n• **Rates**: 0%, 5%, 12%, 18%, 28% based on goods/services\n• **Registration**: Mandatory for businesses with turnover > ₹40 lakh (₹20 lakh for special states)\n\n• **Returns Filing**:\n  - GSTR-1: Outward supplies (Monthly/Quarterly)\n  - GSTR-3B: Summary return (Monthly)\n  - GSTR-9: Annual return\n\n• **Input Tax Credit**: Credit for tax paid on inputs can be used to pay output tax\n• **E-way Bill**: Required for goods movement above ₹50,000\n• **Penalties**: Late filing fee ₹50 per day per return, interest @18% p.a.\n\n**Compliance**: Use GST portal (www.gst.gov.in) for registration and returns.',
        reference: 'Central Goods and Services Tax Act, 2017',
        keywords: ['gst', 'tax', 'goods and services tax', 'input credit', 'return filing']
      },

      'company': {
        content: 'Company Law under Companies Act, 2013:\n\n• **Types**: Private Limited, Public Limited, One Person Company (OPC), Section 8 Company\n• **Incorporation**: Minimum 2 directors for private, 3 for public company\n• **Share Capital**: Minimum ₹1 lakh for private, ₹5 lakh for public company\n• **Compliance**: Annual filing of AOC-4, MGT-7, ADT-1 mandatory\n\n• **Director Duties**: Fiduciary duty, duty of care, avoid conflict of interest\n• **Meetings**: Board meetings quarterly, AGM annually within 6 months of financial year end\n• **Audit**: Mandatory for companies with turnover > ₹1 crore or borrowings > ₹50 lakh\n\n• **Penalties**: Non-compliance attracts fines up to ₹25 lakh and imprisonment\n• **Winding Up**: Voluntary or compulsory under Insolvency and Bankruptcy Code, 2016\n\n**Key Provisions**: Section 8 (charitable companies), Section 164 (director disqualification)',
        reference: 'Companies Act, 2013',
        keywords: ['company', 'incorporation', 'director', 'compliance', 'shares', 'audit']
      },

      // Labor Law Expansion
      'termination': {
        content: 'Employment Termination in India:\n\n• **Types**: Resignation, retrenchment, dismissal, retirement, death\n• **Notice Period**: As per employment contract or standing orders\n• **Retrenchment**: Under Industrial Disputes Act - 1 month notice + compensation\n• **Compensation**: 15 days average pay for each completed year of service\n\n• **Wrongful Termination**: Termination without following due process\n• **Remedies**: Reinstatement with back wages or compensation\n• **Gratuity**: Payable after 5 years of continuous service\n• **PF/ESI**: Final settlement within 30 days of last working day\n\n• **Dismissal for Misconduct**: After proper inquiry and opportunity to defend\n• **Golden Handshake**: Voluntary retirement with enhanced compensation\n\n**Protection**: Industrial workers protected under Industrial Disputes Act, 1947\n**At-will Employment**: Not recognized in India, termination requires just cause',
        reference: 'Industrial Disputes Act 1947, Payment of Gratuity Act 1972',
        keywords: ['termination', 'retrenchment', 'dismissal', 'wrongful termination', 'gratuity', 'notice period']
      },

      // Consumer Law
      'consumer': {
        content: 'Consumer Protection in India:\n\n• **Consumer Protection Act, 2019**: Replaced 1986 Act with enhanced provisions\n• **Consumer Rights**: Right to safety, information, choice, redressal, education, healthy environment\n• **Defects Covered**: Deficiency in service, unfair trade practices, defective goods\n\n• **Complaint Forums**:\n  - District Commission: Claims up to ₹1 crore\n  - State Commission: ₹1 crore to ₹10 crore\n  - National Commission: Above ₹10 crore\n\n• **E-commerce Protection**: Specific provisions for online shopping, liability of platforms\n• **Product Liability**: Manufacturer, seller, service provider liable for defective products\n• **Mediation**: Alternative dispute resolution mechanism available\n\n• **Penalties**: Misleading ads can attract fine up to ₹10 lakh and imprisonment up to 2 years\n• **Central Consumer Protection Authority**: Regulatory body for consumer protection',
        reference: 'Consumer Protection Act, 2019',
        keywords: ['consumer', 'consumer protection', 'deficiency', 'unfair trade', 'product liability']
      },

      // Banking Law
      'banking': {
        content: 'Banking Laws in India:\n\n• **Banking Regulation Act, 1949**: Governs banking operations in India\n• **RBI Act, 1934**: Establishes Reserve Bank as central bank\n• **Account Types**: Savings, current, fixed deposit, recurring deposit\n• **KYC Norms**: Know Your Customer requirements for account opening\n\n• **Loan Recovery**: SARFAESI Act, 2002 for secured asset recovery without court\n• **Insolvency**: IBC, 2016 for resolution of stressed assets\n• **Digital Banking**: Payment and Settlement Systems Act, 2007\n• **Banking Ombudsman**: Grievance redressal for banking services\n\n• **Deposit Insurance**: DICGC insures deposits up to ₹5 lakh per depositor per bank\n• **Priority Sector**: 40% lending to agriculture, MSME, education, housing\n• **NPA Classification**: 90+ days overdue classified as Non-Performing Asset\n\n**Customer Rights**: Right to fair treatment, transparency, privacy, grievance redressal',
        reference: 'Banking Regulation Act 1949, RBI Act 1934, SARFAESI Act 2002',
        keywords: ['banking', 'loan', 'deposit', 'npa', 'sarfaesi', 'rbi', 'ombudsman']
      },

      // Environmental Law
      'environment': {
        content: 'Environmental Laws in India:\n\n• **Environment Protection Act, 1986**: Umbrella legislation for environmental protection\n• **Water Act, 1974**: Prevention and control of water pollution\n• **Air Act, 1981**: Prevention and control of air pollution\n• **Forest Conservation Act, 1980**: Conservation of forests\n\n• **Environmental Clearance**: Required for projects affecting environment\n• **Pollution Control Boards**: State and Central boards for monitoring\n• **Green Tribunal**: National Green Tribunal for environmental disputes\n• **EIA**: Environmental Impact Assessment mandatory for certain projects\n\n• **Penalties**: Imprisonment up to 5 years and fine up to ₹1 lakh\n• **Public Interest**: Citizens can file PIL for environmental protection\n• **Polluter Pays**: Principle that polluter bears cost of pollution\n\n**Recent**: Plastic waste management rules, e-waste management rules, construction & demolition waste rules',
        reference: 'Environment Protection Act 1986, Water Act 1974, Air Act 1981',
        keywords: ['environment', 'pollution', 'forest', 'green tribunal', 'clearance', 'eia']
      }
    };

    const lowercaseMessage = userMessage.toLowerCase();

    // Enhanced keyword matching with legal context
    let bestMatch: any = null;
    let maxScore = 0;
    let matchedKey = '';

    for (const [key, data] of Object.entries(legalDatabase)) {
      let score = 0;

      // Exact key match (highest priority)
      if (lowercaseMessage.includes(key)) {
        score += 15;
      }

      // Keyword matching with weighted scoring
      for (const keyword of data.keywords) {
        if (lowercaseMessage.includes(keyword)) {
          // Legal terms get higher weight
          const legalTerms = ['ipc', 'crpc', 'act', 'section', 'law', 'legal', 'court', 'judge'];
          const weight = legalTerms.some(term => keyword.includes(term)) ? 8 : 5;
          score += weight;
        }
      }

      // Contextual matching for legal phrases
      const legalPhrases = {
        'what is': 3,
        'how to': 4,
        'can i': 3,
        'procedure for': 5,
        'punishment for': 4,
        'rights of': 4,
        'law on': 5,
        'section': 6,
        'under which act': 7
      };

      for (const [phrase, weight] of Object.entries(legalPhrases)) {
        if (lowercaseMessage.includes(phrase)) {
          score += weight;
        }
      }

      // Partial word matching with stemming
      const words = lowercaseMessage.split(' ').filter(word => word.length > 3);
      for (const word of words) {
        // Check against key and keywords
        if (key.includes(word) || data.keywords.some(k => k.includes(word))) {
          score += 3;
        }

        // Legal document references
        if (word.match(/\d+[a-z]?/) && (key.includes('ipc') || key.includes('section'))) {
          score += 5;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = data;
        matchedKey = key;
      }
    }

    if (bestMatch && maxScore > 0) {
      return {
        content: bestMatch.content,
        reference: bestMatch.reference,
        confidence: Math.min(maxScore / 10, 1)
      };
    }

    // Intelligent fallback based on question type
    const questionType = this.analyzeQuestionType(userMessage);
    
    return {
      content: this.generateContextualResponse(userMessage, questionType),
      reference: 'General Legal Guidance',
      confidence: 0.3
    };
  }

  private analyzeQuestionType(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('what is') || lowerMessage.includes('define')) {
      return 'definition';
    }
    if (lowerMessage.includes('how to') || lowerMessage.includes('procedure')) {
      return 'procedure';
    }
    if (lowerMessage.includes('punishment') || lowerMessage.includes('penalty')) {
      return 'punishment';
    }
    if (lowerMessage.includes('rights') || lowerMessage.includes('can i')) {
      return 'rights';
    }
    if (lowerMessage.includes('section') || lowerMessage.includes('ipc') || lowerMessage.includes('crpc')) {
      return 'legal_section';
    }
    
    return 'general';
  }

  private generateContextualResponse(message: string, type: string): string {
    const legalAreas = this.identifyLegalArea(message);
    const urgency = this.assessUrgency(message);

    const responses = {
      definition: `I'd be happy to help explain legal concepts related to "${message}". ${legalAreas.length > 0 ? `This appears to relate to ${legalAreas.join(', ')} law. ` : ''}For precise definitions and their legal implications in your specific context, I recommend consulting legal dictionaries, bare acts, or speaking with a qualified legal professional specializing in this area.`,

      procedure: `Legal procedures can be complex and vary by jurisdiction and specific circumstances. For "${message}", ${legalAreas.length > 0 ? `which falls under ${legalAreas.join(', ')} law, ` : ''}the procedure typically involves multiple steps with specific timelines and documentation requirements. ${urgency === 'high' ? 'Given the time-sensitive nature of this matter, ' : ''}I strongly recommend consulting with a practicing lawyer who can provide step-by-step guidance tailored to your situation.`,

      punishment: `Punishments and penalties in Indian law depend on various factors including the specific offense, circumstances, criminal history, and applicable sections. For "${message}", ${legalAreas.length > 0 ? `which is governed by ${legalAreas.join(', ')} law, ` : ''}penalties can range from fines to imprisonment depending on the severity. For accurate information about specific penalties and potential defenses, please consult the relevant legal provisions or seek advice from a criminal law expert.`,

      rights: `Legal rights can vary significantly based on specific circumstances, applicable laws, and your particular situation. Regarding "${message}", ${legalAreas.length > 0 ? `which involves ${legalAreas.join(', ')} law, ` : ''}you may have various rights including constitutional protections, statutory rights, and common law remedies. ${urgency === 'high' ? 'If this is an urgent matter, ' : ''}I recommend consulting with a legal expert who can assess your particular situation and provide guidance on your rights and available legal remedies.`,

      legal_section: `Legal sections and their interpretations require careful analysis of the specific provisions, amendments, and relevant case law. For "${message}", ${legalAreas.length > 0 ? `which is covered under ${legalAreas.join(', ')} legislation, ` : ''}the interpretation may vary based on factual circumstances and judicial precedents. I recommend referring to the bare act, relevant case law from Supreme Court and High Courts, legal commentaries, or consulting with a legal professional for proper interpretation and application to your specific case.`,

      general: `Thank you for your legal question about "${message}". ${legalAreas.length > 0 ? `This appears to involve ${legalAreas.join(', ')} law. ` : ''}While I can provide general legal information, this appears to be a specific query that would benefit from detailed legal research and professional analysis. ${urgency === 'high' ? 'Given the potentially urgent nature of this matter, ' : ''}I recommend consulting with a qualified legal professional${legalAreas.length > 0 ? ` specializing in ${legalAreas.join(', ')} law` : ''} for personalized advice on this matter.`
    };

    return responses[type as keyof typeof responses] || responses.general;
  }

  private identifyLegalArea(message: string): string[] {
    const areas: string[] = [];
    const lowerMessage = message.toLowerCase();

    const areaKeywords = {
      'Criminal': ['crime', 'criminal', 'police', 'arrest', 'bail', 'fir', 'ipc', 'murder', 'theft', 'fraud', 'cybercrime'],
      'Civil': ['contract', 'property', 'tort', 'damages', 'breach', 'agreement', 'sale', 'purchase'],
      'Family': ['marriage', 'divorce', 'custody', 'maintenance', 'dowry', 'domestic violence', 'inheritance'],
      'Constitutional': ['fundamental rights', 'constitution', 'article', 'writ', 'habeas corpus', 'mandamus'],
      'Commercial': ['company', 'business', 'gst', 'tax', 'partnership', 'trademark', 'copyright'],
      'Labor': ['employment', 'termination', 'salary', 'workplace', 'industrial dispute', 'gratuity'],
      'Consumer': ['consumer', 'deficiency', 'service', 'product', 'warranty', 'refund'],
      'Environmental': ['environment', 'pollution', 'forest', 'green', 'clearance'],
      'Banking': ['bank', 'loan', 'deposit', 'credit', 'npa', 'recovery']
    };

    for (const [area, keywords] of Object.entries(areaKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        areas.push(area);
      }
    }

    return areas;
  }

  private assessUrgency(message: string): 'low' | 'medium' | 'high' {
    const urgentKeywords = ['urgent', 'emergency', 'immediate', 'arrest', 'custody', 'notice', 'summons', 'deadline'];
    const mediumKeywords = ['soon', 'quickly', 'fast', 'time limit', 'within days'];

    const lowerMessage = message.toLowerCase();

    if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }
    if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  // Check if AI provider is available
  isAIEnabled(): boolean {
    return this.hasAIProvider;
  }

  // Get AI provider status
  getProviderStatus(): string {
    if (this.hasAIProvider) {
      return 'OpenAI GPT-3.5 Turbo';
    }
    return 'Enhanced Rule-based System';
  }
}

export const aiService = new AIService();
export type { AIResponse, LegalContext };
