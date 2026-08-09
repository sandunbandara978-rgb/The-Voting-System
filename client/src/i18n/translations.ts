import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'Sri Lanka Parliamentary General Election',
    appSubtitle: 'Official Digital Voting System Simulation',
    simNotice: 'EDUCATIONAL SIMULATION — NOT AN OFFICIAL GOVERNMENT SERVICE',
    startVoting: 'Start Voting Now',
    exploreResults: 'Explore Results Center',
    adminAccess: 'Official Portal Login',
    seniorMode: 'Senior Citizen Accessibility Mode',
    seniorModeActive: 'Senior Accessibility Active',
    language: 'Language',
    verifyIdentity: 'Identity Verification',
    eligibilityCheck: 'Eligibility Check',
    electionInfo: 'Election Information',
    digitalBallot: 'Digital Voting Ballot',
    reviewVote: 'Review Your Vote',
    confirmation: 'Vote Recorded',
    resultsCenter: 'Election Results Center',
    finalReport: 'Final Election Report',
    aboutSystem: 'About Simulation',
    
    // Hero
    heroTitle: 'YOUR VOICE. YOUR CHOICE.',
    heroSubtitle: 'A secure, accessible, and transparent digital voting platform simulating Sri Lankan parliamentary elections.',
    tagline: 'Verify. Vote. Confirm. Simple for an 18-year-old or an 80-year-old.',
    
    // Verification
    selectDocument: 'Select Your Identification Document',
    nic: 'National Identity Card (NIC)',
    passport: 'Passport',
    drivingLicence: 'Driving Licence',
    nicPlaceholder: 'e.g. 199012345678 or 901234567V',
    passportPlaceholder: 'e.g. N1234567',
    dlPlaceholder: 'e.g. B1234567',
    enterDocNumber: 'Enter Document Number',
    enterDob: 'Date of Birth (Optional)',
    verifyBtn: 'Verify Identity & Continue',
    verifying: 'Verifying identity with electoral roll...',
    
    // Eligibility Status
    idVerified: 'Identity Verified',
    ageRequirement: 'Age Requirement Satisfied (18+ Years)',
    districtAssigned: 'Electoral District Assigned',
    votingStatus: 'Voting Status',
    eligibleToVote: 'ELIGIBLE TO VOTE',
    alreadyVoted: 'ALREADY VOTED — Duplicate voting is strictly blocked',
    continueToBallot: 'Continue to Digital Ballot',
    
    // Ballot
    ballotInstructions: 'Select your preferred Political Party or Independent Group. You may also select up to 3 preferred candidate numbers.',
    selectParty: '1. Select Political Party / Group',
    selectPreferences: '2. Candidate Preferences (Optional — Max 3)',
    viewCandidates: 'View Candidates',
    candidateNumber: 'Candidate No.',
    reviewSelectionBtn: 'Proceed to Review Vote',
    
    // Review Modal
    reviewTitle: 'Confirm Your Vote Selection',
    reviewWarning: 'Please check your selection carefully. Your vote cannot be altered after final confirmation.',
    chosenParty: 'Selected Party / Group',
    chosenCandidates: 'Selected Candidate Preferences',
    goBack: 'Go Back & Change',
    confirmSubmitBtn: 'CONFIRM & SUBMIT SECURE BALLOT',
    submittingVote: 'Recording anonymous vote to ballot vault...',
    
    // Confirmation / Receipt
    voteSuccessTitle: 'Your Vote Has Been Recorded Successfully',
    receiptLabel: 'Anonymous Vote Confirmation Receipt ID:',
    secrecyNotice: 'Ballot Secrecy Guaranteed: Your voter identity is decoupled from your vote record in the database.',
    returnHome: 'Return to Homepage',
    viewLiveResults: 'View Live Results',
    
    // Results
    turnoutTitle: 'Voter Turnout',
    totalCast: 'Total Votes Cast',
    validVotes: 'Valid Votes',
    invalidVotes: 'Invalid Votes',
    seatsWon: 'Seats Allocated',
    majorityStatus: 'Parliamentary Majority Status',
    winningParty: 'Leading / Winning Party',
    downloadPdf: 'Download PDF Report',
    exportCsv: 'Export CSV Data',
    
    // Senior Mode Callouts
    seniorHelp: 'Press the Voice button to hear screen instructions read aloud clearly.'
  },

  si: {
    appTitle: 'ශ්‍රී ලංකා පාර්ලිමේන්තු මහ මැතිවරණය',
    appSubtitle: 'නිල ඩිජිටල් ඡන්දදායක පද්ධති අනුකරණය',
    simNotice: 'අධ්‍යාපනික ආකෘතියකි — නිල රජයේ සේවාවක් නොවේ',
    startVoting: 'ඡන්දය ප්‍රකාශ කිරීම ආරම්භ කරන්න',
    exploreResults: 'මැතිවරණ ප්‍රතිඵල නරඹන්න',
    adminAccess: 'නිලධාරී පිවිසුම',
    seniorMode: 'ජ්‍යෙෂ්ඨ ඡන්දදායක සුවපහසු මාදිලිය',
    seniorModeActive: 'ජ්‍යෙෂ්ඨ සුවපහසු මාදිලිය ක්‍රියාත්මකයි',
    language: 'භාෂාව',
    verifyIdentity: 'ඡන්දදායක අනන්‍යතාව තහවුරු කිරීම',
    eligibilityCheck: 'සුදුසුකම් පරීක්ෂාව',
    electionInfo: 'මැතිවරණ තොරතුරු',
    digitalBallot: 'ඩිජිටල් ඡන්ද පත්‍රිකාව',
    reviewVote: 'ඡන්දය නැවත සමාලෝචනය',
    confirmation: 'ඡන්දය සටහන් විය',
    resultsCenter: 'මැතිවරණ ප්‍රතිඵල මධ්‍යස්ථානය',
    finalReport: 'අවසන් මැතිවරණ වාර්තාව',
    aboutSystem: 'පද්ධතිය පිළිබඳව',
    
    // Hero
    heroTitle: 'ඔබේ ඡන්දය. ඔබේ අනාගතය.',
    heroSubtitle: 'ශ්‍රී ලංකා පාර්ලිමේන්තු මහ මැතිවරණය අනුකරණය කෙරෙන සුරක්ෂිත සහ විනිවිද පෙනෙන ඩිජිටල් වේදිකාව.',
    tagline: 'තහවුරු කරන්න. ඡන්දය දෙන්න. ස්ථිර කරන්න. වයස 18 සිට 80 දක්වා සැමටම පහසුයි.',
    
    // Verification
    selectDocument: 'ඔබගේ අනන්‍යතා ලේඛනය තෝරන්න',
    nic: 'ජාතික හැඳුනුම්පත (NIC)',
    passport: 'ගමන් බලපත්‍රය (Passport)',
    drivingLicence: 'රියදුරු බලපත්‍රය (Driving Licence)',
    nicPlaceholder: 'උදා: 199012345678 හෝ 901234567V',
    passportPlaceholder: 'උදා: N1234567',
    dlPlaceholder: 'උදා: B1234567',
    enterDocNumber: 'ලේඛන අංකය ඇතුළත් කරන්න',
    enterDob: 'උපන් දිනය (අත්‍යවශ්‍ය නොවේ)',
    verifyBtn: 'අනන්‍යතාව තහවුරු කර ඉදිරියට යන්න',
    verifying: 'මැතිවරණ ලේඛනය පරීක්ෂා කරමින් පවතී...',
    
    // Eligibility Status
    idVerified: 'අනන්‍යතාව තහවුරු විය',
    ageRequirement: 'වයස අවුරුදු 18 සම්පූර්ණයි',
    districtAssigned: 'මැතිවරණ දිස්ත්‍රික්කය අනුපිටපත් විය',
    votingStatus: 'ඡන්ද තත්ත්වය',
    eligibleToVote: 'ඡන්දය දීමට සුදුසුකම් ඇත',
    alreadyVoted: 'ඡන්දය ප්‍රකාශ කර ඇත — දෙවන වරට ඡන්දය දීම වළක්වා ඇත',
    continueToBallot: 'ඡන්ද පත්‍රිකාව වෙත යන්න',
    
    // Ballot
    ballotInstructions: 'ඔබ කැමති දේශපාලන පක්ෂය හෝ ස්වාධීන කණ්ඩායම තෝරන්න. තවද මනාප අපේක්ෂකයින් 3 දෙනෙකු දක්වා තෝරාගත හැක.',
    selectParty: '1. දේශපාලන පක්ෂය / කණ්ඩායම තෝරන්න',
    selectPreferences: '2. අපේක්ෂක මනාප (උපරිම 3 යි)',
    viewCandidates: 'අපේක්ෂකයින් බලන්න',
    candidateNumber: 'අපේක්ෂක අංක',
    reviewSelectionBtn: 'ඡන්දය පරීක්ෂා කිරීමට ඉදිරියට යන්න',
    
    // Review Modal
    reviewTitle: 'ඔබේ ඡන්ද තේරීම ස්ථිර කරන්න',
    reviewWarning: 'කරුණාකර ඔබේ තේරීම පරීක්ෂා කරන්න. අවසන් ස්ථිර කිරීමෙන් පසු ඡන්දය වෙනස් කළ නොහැක.',
    chosenParty: 'තෝරාගත් පක්ෂය / කණ්ඩායම',
    chosenCandidates: 'තෝරාගත් අපේක්ෂක මනාප',
    goBack: 'ආපසු ගොස් වෙනස් කරන්න',
    confirmSubmitBtn: 'ඡන්දය රහසිගතව කැප කරන්න',
    submittingVote: 'ඡන්දය රහසිගත පෙට්ටියට ඇතුළත් කරමින් පවතී...',
    
    // Confirmation / Receipt
    voteSuccessTitle: 'ඔබේ ඡන්දය සාර්ථකව සටහන් විය',
    receiptLabel: 'රහසිගත ඡන්ද තහවුරු කිරීමේ කේතය:',
    secrecyNotice: 'ඡන්ද රහස්‍යභාවය සුරක්ෂිතයි: ඔබේ අනන්‍යතාවය සහ ඡන්දය අතර කිසිදු සම්බන්ධයක් දත්ත පද්ධතියේ තබා නොගනී.',
    returnHome: 'මුල් පිටුවට යන්න',
    viewLiveResults: 'සජීවී ප්‍රතිඵල බලන්න',
    
    // Results
    turnoutTitle: 'ඡන්දය ප්‍රකාශ කිරීමේ ප්‍රතිශතය',
    totalCast: 'ප්‍රකාශිත මුළු ඡන්ද',
    validVotes: 'වලංගු ඡන්ද',
    invalidVotes: 'ප්‍රතික්ෂේපිත ඡන්ද',
    seatsWon: 'හිමි වූ මන්ත්‍රී ආසන',
    majorityStatus: 'පාර්ලිමේන්තු බහුතර තත්ත්වය',
    winningParty: 'ජයග්‍රාහී / පෙරමුණේ පක්ෂය',
    downloadPdf: 'PDF වාර්තාව බාගත කරන්න',
    exportCsv: 'CSV දත්ත බාගත කරන්න',
    
    // Senior Mode Callouts
    seniorHelp: 'උපදෙස් ශ්‍රවණය කිරීමට හඬ බොත්තම ඔබන්න.'
  },

  ta: {
    appTitle: 'இலங்கை நாடாளுமன்றப் பொதுத்தேர்தல்',
    appSubtitle: 'அதிகாரப்பூர்வ டிஜிட்டல் வாக்குப்பதிவு மாதிரி',
    simNotice: 'கல்விசார் மாதிரி — இது அரசாங்கத்தின் அதிகாரப்பூர்வ சேவையல்ல',
    startVoting: 'வாக்களிக்கத் தொடங்குங்கள்',
    exploreResults: 'தேர்தல் முடிவுகளைப் பார்க்க',
    adminAccess: 'அதிகாரிகள் உள்நுழைவு',
    seniorMode: 'முதியோர் அணுகல் முறைமை',
    seniorModeActive: 'முதியோர் முறைமை செயல்பாட்டில் உள்ளது',
    language: 'மொழி',
    verifyIdentity: 'அடையாளச் சரிபார்ப்பு',
    eligibilityCheck: 'தகுதிச் சரிபார்ப்பு',
    electionInfo: 'தேர்தல் தகவல்',
    digitalBallot: 'டிஜிட்டல் வாக்குச் சீட்டு',
    reviewVote: 'வாக்கை மதிப்பாய்வு செய்க',
    confirmation: 'வாக்கு பதிவானது',
    resultsCenter: 'தேர்தல் முடிவுகள் மையம்',
    finalReport: 'இறுதித் தேர்தல் அறிக்கை',
    aboutSystem: 'அமைப்பு பற்றி',
    
    // Hero
    heroTitle: 'உங்கள் குரல். உங்கள் தேர்வு.',
    heroSubtitle: 'இலங்கை நாடாளுமன்றத் தேர்தலை மாதிரியாக்கும் பாதுகாப்பான மற்றும் வெளிப்படையான டிஜிட்டல் வாக்குப்பதிவு தளம்.',
    tagline: 'சரிபார்க்கவும். வாக்களிக்கவும். உறுதிப்படுத்தவும். 18 முதல் 80 வயது வரை அனைவருக்கும் எளிதானது.',
    
    // Verification
    selectDocument: 'உங்கள் அடையாள ஆவணத்தைத் தேர்ந்தெடுக்கவும்',
    nic: 'தேசிய அடையாள அட்டை (NIC)',
    passport: 'கடவுச்சீட்டு (Passport)',
    drivingLicence: 'சாரதி அனுமதிப்பத்திரம் (Driving Licence)',
    nicPlaceholder: 'எ-கா: 199012345678 அல்லது 901234567V',
    passportPlaceholder: 'எ-கா: N1234567',
    dlPlaceholder: 'எ-கா: B1234567',
    enterDocNumber: 'ஆவண எண்ணை உள்ளிடவும்',
    enterDob: 'பிறந்த தேதி (விருப்பத்தேர்வு)',
    verifyBtn: 'அடையாளத்தை சரிபார்த்து தொடரவும்',
    verifying: 'வாக்காளர் பட்டியலைச் சரிபார்க்கிறது...',
    
    // Eligibility Status
    idVerified: 'அடையாளம் சரிபார்க்கப்பட்டது',
    ageRequirement: '18+ வயது தகுதி பூர்த்தியானது',
    districtAssigned: 'தேர்தல் மாவட்டம் ஒதுக்கப்பட்டது',
    votingStatus: 'வாக்களிப்பு நிலை',
    eligibleToVote: 'வாக்களிக்கத் தகுதியானவர்',
    alreadyVoted: 'ஏற்கனவே வாக்களித்துள்ளார் — இரட்டை வாக்களிப்பு தடுக்கப்பட்டுள்ளது',
    continueToBallot: 'வாக்குச் சீட்டுக்குச் செல்லவும்',
    
    // Ballot
    ballotInstructions: 'உங்களுக்கு விருப்பமான அரசியல் கட்சி அல்லது சுயேச்சைக் குழுவைத் தேர்ந்தெடுக்கவும். 3 வேட்பாளர் விருப்பு எண்களையும் தேர்ந்தெடுக்கலாம்.',
    selectParty: '1. அரசியல் கட்சி / குழுவைத் தேர்ந்தெடுக்கவும்',
    selectPreferences: '2. வேட்பாளர் விருப்பு எண்கள் (அதிகபட்சம் 3)',
    viewCandidates: 'வேட்பாளர்களைப் பார்க்க',
    candidateNumber: 'வேட்பாளர் எண்',
    reviewSelectionBtn: 'வாக்கை மதிப்பாய்வு செய்யத் தொடரவும்',
    
    // Review Modal
    reviewTitle: 'உங்கள் வாக்குத் தேர்வை உறுதிப்படுத்தவும்',
    reviewWarning: 'தயவுசெய்து உங்கள் தேர்வை கவனமாகச் சரிபார்க்கவும். இறுதி உறுதிப்படுத்தலுக்குப் பிறகு மாற்ற முடியாது.',
    chosenParty: 'தேர்ந்தெடுக்கப்பட்ட கட்சி / குழு',
    chosenCandidates: 'தேர்ந்தெடுக்கப்பட்ட வேட்பாளர் விருப்பங்கள்',
    goBack: 'பின்சென்று மாற்றவும்',
    confirmSubmitBtn: 'வாக்கை இரகசியமாகச் சமர்ப்பிக்கவும்',
    submittingVote: 'வாக்கு பெட்டியில் பதிவு செய்யப்படுகிறது...',
    
    // Confirmation / Receipt
    voteSuccessTitle: 'உங்கள் வாக்கு வெற்றி கரமாகப் பதிவானது',
    receiptLabel: 'இரகசிய வாக்கு உறுதிப்படுத்தல் குறியீடு:',
    secrecyNotice: 'வாக்கு இரகசியம் உறுதி செய்யப்பட்டுள்ளது: உங்கள் அடையாளத்திற்கும் வாக்குக்கும் எந்தத் தொடர்பும் தரவுத்தளத்தில் சேமிக்கப்படாது.',
    returnHome: 'முகப்புப் பக்கத்திற்குத் திரும்புக',
    viewLiveResults: 'நேரலை முடிவுகளைப் பார்க்க',
    
    // Results
    turnoutTitle: 'வாக்காளர் வாக்குப்பதிவு சதவீதம்',
    totalCast: 'மொத்த வாக்களிப்பு',
    validVotes: 'செல்லுபடியாகும் வாக்குகள்',
    invalidVotes: 'நிராகரிக்கப்பட்ட வாக்குகள்',
    seatsWon: 'ஒதுக்கப்பட்ட ஆசனங்கள்',
    majorityStatus: 'நாடாளுமன்ற பெரும்பான்மை நிலை',
    winningParty: 'வெற்றி பெற்ற கட்சி',
    downloadPdf: 'PDF அறிக்கையைப் பதிவிறக்கவும்',
    exportCsv: 'CSV தரவை ஏற்றுமதி செய்யவும்',
    
    // Senior Mode Callouts
    seniorHelp: 'அறிவுறுத்தல்களைக் கேட்க ஒலி பொத்தானை அழுத்தவும்.'
  }
};
