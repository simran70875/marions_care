import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// --- Type Definitions for Form State (Comprehensive based on image) ---
interface FormData {
    // General Information (New Section from Image)
    name: string;
    preferredName: string;
    pronouns: 'She/Her' | 'He/Him' | 'They/Them' | 'Other' | '';
    otherPronouns: string; // For the 'Other' pronoun option

    // Health (Original Section)
    pendentAlarm: string;
    pastMedicalHistory: string;
    currentHealthConditions: string;
    mentalHealthConsiderations: string;
    knownAllergies: string;
    endOfLifeWishes: string;
    dnarInPlace: boolean | null;
    behaviouralAggression: 'Verbal aggression' | 'Physical aggression' | 'None of the above' | null;
    currentOralMedication: string;
    topicalMedication: string;
    topicalMedicationSupport: boolean | null;
    inhalersEyeEarDrops: string;
    inhalerSupport: boolean | null;
    medicationObtainMethod: string;

    // Personal Care (Original Section)
    incontinenceNeeds: boolean | null;
    incontinenceSupport: string;
    personalHygieneSupport: string;
    oralHygieneSupport: string;

    // Physical Health Considerations (Original Section)
    mobilityOverview: string;
    strength: string[]; // Using an array for multiple strength checkboxes
    equipmentInfo: string;

    // Nutrition and Hydration (Original Section)
    dietaryRequirements: string;
    saltTeamInvolvement: boolean | null;
    saltAdditionalInfo: string;
    mealPreparer: 'Family/Friends' | 'Independently' | 'Carers' | null;

    // Domestic Support (Original Section)
    domesticTasks: string;
    foodShoppingSupport: 'Carers' | 'Independent' | 'Family/Friends' | null;
    whoDoYouLiveWith: string;
    propertyAccess: string;

    // Care Package Details (Original Section)
    visitsPerDay: string;
    timingPreferences: string;
    singleDoubleCover: 'Single' | 'Double' | null;
    genderPreferences: string;

    // Personal Background (Original Section)
    familyInfo: string;
    hobbies: string;
    workHistory: string;
    likes: string;

    // Final Section (Original Section)
    additionalCareInfo: string;
    formCompletedBy: string;
    dateCompleted: string;
}

// Initial state matching the structure above
const initialFormData: FormData = {
    // General Information
    name: '', preferredName: '', pronouns: '', otherPronouns: '',

    // Health
    pendentAlarm: '', pastMedicalHistory: '', currentHealthConditions: '', mentalHealthConsiderations: '',
    knownAllergies: '', endOfLifeWishes: '', dnarInPlace: null, behaviouralAggression: null,
    currentOralMedication: '', topicalMedication: '', topicalMedicationSupport: null,
    inhalersEyeEarDrops: '', inhalerSupport: null, medicationObtainMethod: '',

    // Personal Care
    incontinenceNeeds: null, incontinenceSupport: '', personalHygieneSupport: '', oralHygieneSupport: '',

    // Physical Health Considerations
    mobilityOverview: '', strength: [], equipmentInfo: '',

    // Nutrition and Hydration
    dietaryRequirements: '', saltTeamInvolvement: null, saltAdditionalInfo: '', mealPreparer: null,

    // Domestic Support
    domesticTasks: '', foodShoppingSupport: null, whoDoYouLiveWith: '', propertyAccess: '',

    // Care Package Details
    visitsPerDay: '', timingPreferences: '', singleDoubleCover: null, genderPreferences: '',

    // Personal Background
    familyInfo: '', hobbies: '', workHistory: '', likes: '',

    // Final Section
    additionalCareInfo: '', formCompletedBy: '', dateCompleted: '',
};

// --- Reusable Form Field Components (Tailwind assumed) ---

// Basic Text Area Question
const TextAreaQuestion: React.FC<{ label: string; name: keyof FormData; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; page: number }> = ({ label, name, value, onChange, page }) => (
    <div className="p-4 bg-gray-100 mb-4 rounded-md">
        <label className="text-sm font-medium text-gray-800 block mb-2">{label}</label>
        <textarea
            name={name as string}
            value={value}
            onChange={onChange}
            rows={4}
            placeholder="Please enter your answer here."
            className="w-full border p-2 text-sm rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span className="text-blue-500 cursor-pointer">
                <span role="img" aria-label="attach">📎</span> (Click to attach image)
            </span>
            <span>{page} of 74</span>
        </div>
    </div>
);

// Checkbox/Radio Group Question
const CheckboxRadioQuestion: React.FC<{ label: string; name: keyof FormData; options: string[]; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type: 'checkbox' | 'radio'; page: number }> = ({ label, name, options, value, onChange, type, page }) => (
    <div className="p-4 bg-gray-100 mb-4 rounded-md">
        <label className="text-sm font-medium text-gray-800 block mb-2">{label}</label>
        <div className="space-y-2">
            {options.map((option) => (
                <label key={option} className="flex items-center bg-white p-2 rounded border border-gray-200 cursor-pointer">
                    <input
                        type={type}
                        name={name as string}
                        value={option}
                        checked={type === 'radio' ? value === option : (value as string[]).includes(option)}
                        onChange={onChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
            ))}
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span className="text-blue-500 cursor-pointer">
                <span role="img" aria-label="attach">📎</span> (Click to attach image)
            </span>
            <span>{page} of 74</span>
        </div>
    </div>
);

// --- Main Form Component ---
const ComprehensiveCareForm = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => {
            // Special handling for pronouns to store 'Other' text
            if (name === 'pronouns') {
                return { ...prev, pronouns: value as FormData['pronouns'], otherPronouns: value === 'Other' ? prev.otherPronouns : '' };
            }
            if (name === 'otherPronouns') {
                return { ...prev, otherPronouns: value };
            }

            // Handle radio buttons (single selection)
            if (type === 'radio') {
                return { ...prev, [name]: value };
            }
            // Handle specific boolean radio/checkboxes (Yes/No, Single/Double)
            if (['dnarInPlace', 'topicalMedicationSupport', 'inhalerSupport', 'incontinenceNeeds', 'saltTeamInvolvement'].includes(name)) {
                return { ...prev, [name]: value === 'Yes' };
            }
            // Handle strength checkboxes (multiple selection)
            if (name === 'strength' && type === 'checkbox') {
                const prevStrength = prev.strength || [];
                if (checked) {
                    return { ...prev, strength: [...prevStrength, value] };
                } else {
                    return { ...prev, strength: prevStrength.filter(item => item !== value) };
                }
            }
            // Default handler for text areas, single text inputs
            return { ...prev, [name]: type === 'checkbox' ? checked : value };
        });
    };

    const handleSingleSelectChange = (name: keyof FormData, value: string | boolean | null) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const renderGeneralInformationSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">General Information</div>
            <TextAreaQuestion
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                page={1}
            />
            <TextAreaQuestion
                label="What would you like the carers to call you?"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleChange}
                page={2}
            />
            <div className="p-4 bg-gray-100 mb-4 rounded-md">
                <label className="text-sm font-medium text-gray-800 block mb-2">What pronouns do you use?</label>
                <div className="space-y-2">
                    {['She/Her', 'He/Him', 'They/Them', 'Other'].map((option) => (
                        <label key={option} className="flex items-center bg-white p-2 rounded border border-gray-200 cursor-pointer">
                            <input
                                type="radio"
                                name="pronouns"
                                value={option}
                                checked={formData.pronouns === option}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option}</span>
                            {option === 'Other' && formData.pronouns === 'Other' && (
                                <input
                                    type="text"
                                    name="otherPronouns"
                                    value={formData.otherPronouns}
                                    onChange={handleChange}
                                    className="ml-2 border p-1 text-sm rounded flex-grow focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Please specify"
                                />
                            )}
                        </label>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span className="text-blue-500 cursor-pointer">
                        <span role="img" aria-label="attach">📎</span> (Click to attach image)
                    </span>
                    <span>3 of 74</span> {/* Assuming this is page 3 */}
                </div>
            </div>
        </>
    );

    const renderHealthSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Health</div>
            <TextAreaQuestion
                label="Does the client have a pendent alarm? If yes, where is it worn?"
                name="pendentAlarm"
                value={formData.pendentAlarm}
                onChange={handleChange}
                page={15}
            />
            <TextAreaQuestion
                label="Past medical history"
                name="pastMedicalHistory"
                value={formData.pastMedicalHistory}
                onChange={handleChange}
                page={16}
            />
            <TextAreaQuestion
                label="Current Health Conditions"
                name="currentHealthConditions"
                value={formData.currentHealthConditions}
                onChange={handleChange}
                page={17}
            />
            <TextAreaQuestion
                label="Do you have any mental health considerations?"
                name="mentalHealthConsiderations"
                value={formData.mentalHealthConsiderations}
                onChange={handleChange}
                page={18}
            />
            <TextAreaQuestion
                label="Known Allergies (Medication/Food)"
                name="knownAllergies"
                value={formData.knownAllergies}
                onChange={handleChange}
                page={19}
            />
            <TextAreaQuestion
                label="Do you have any End Of Life preferences or wishes you would like to share/disclose with us?"
                name="endOfLifeWishes"
                value={formData.endOfLifeWishes}
                onChange={handleChange}
                page={20}
            />

            {/* DNAR in place (Yes/No radio) */}
            <CheckboxRadioQuestion
                label="Do you have a DNAR in place?"
                name="dnarInPlace"
                options={['Yes', 'No']}
                value={formData.dnarInPlace === true ? 'Yes' : formData.dnarInPlace === false ? 'No' : null}
                onChange={(e) => handleSingleSelectChange('dnarInPlace', e.target.value === 'Yes' ? true : false)}
                type="radio"
                page={21}
            />

            {/* Behavioural Aggression (Radio Group) */}
            <CheckboxRadioQuestion
                label="Does the service user present with any of the following behaviour?"
                name="behaviouralAggression"
                options={['Verbal aggression', 'Physical aggression', 'None of the above']}
                value={formData.behaviouralAggression}
                onChange={(e) => handleSingleSelectChange('behaviouralAggression', e.target.value as FormData['behaviouralAggression'])}
                type="radio"
                page={22}
            />
            <TextAreaQuestion
                label="Current Oral Medication"
                name="currentOralMedication"
                value={formData.currentOralMedication}
                onChange={handleChange}
                page={23}
            />
            <TextAreaQuestion
                label="Any Topical Medication"
                name="topicalMedication"
                value={formData.topicalMedication}
                onChange={handleChange}
                page={27}
            />
            {/* Topical Medication Support Required (Yes/No radio) */}
            <CheckboxRadioQuestion
                label="Support required"
                name="topicalMedicationSupport"
                options={['Yes', 'No']}
                value={formData.topicalMedicationSupport === true ? 'Yes' : formData.topicalMedicationSupport === false ? 'No' : null}
                onChange={(e) => handleSingleSelectChange('topicalMedicationSupport', e.target.value === 'Yes' ? true : false)}
                type="radio"
                page={28}
            />
            <TextAreaQuestion
                label="Any inhalers, eye drops, ear drops"
                name="inhalersEyeEarDrops"
                value={formData.inhalersEyeEarDrops}
                onChange={handleChange}
                page={29}
            />
            {/* Inhaler/Drops Support Required (Yes/No radio) */}
            <CheckboxRadioQuestion
                label="Support required"
                name="inhalerSupport"
                options={['Yes', 'No']}
                value={formData.inhalerSupport === true ? 'Yes' : formData.inhalerSupport === false ? 'No' : null}
                onChange={(e) => handleSingleSelectChange('inhalerSupport', e.target.value === 'Yes' ? true : false)}
                type="radio"
                page={30}
            />
            <TextAreaQuestion
                label="How do you obtain your medication? e.g. delivered weekly"
                name="medicationObtainMethod"
                value={formData.medicationObtainMethod}
                onChange={handleChange}
                page={31}
            />
        </>
    );

    const renderPersonalCareSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Personal Care</div>
            {/* Incontinence Needs (Yes/No radio) */}
            <CheckboxRadioQuestion
                label="Incontinence Needs"
                name="incontinenceNeeds"
                options={['Yes', 'No']}
                value={formData.incontinenceNeeds === true ? 'Yes' : formData.incontinenceNeeds === false ? 'No' : null}
                onChange={(e) => handleSingleSelectChange('incontinenceNeeds', e.target.value === 'Yes' ? true : false)}
                type="radio"
                page={35}
            />
            <TextAreaQuestion
                label="How can we support you to maintain your incontinence needs"
                name="incontinenceSupport"
                value={formData.incontinenceSupport}
                onChange={handleChange}
                page={36}
            />
            <TextAreaQuestion
                label="How can we support you to maintain your personal hygiene e.g. bed bath, shower"
                name="personalHygieneSupport"
                value={formData.personalHygieneSupport}
                onChange={handleChange}
                page={37}
            />
            <TextAreaQuestion
                label="How can we support you to maintain your oral hygiene?"
                name="oralHygieneSupport"
                value={formData.oralHygieneSupport}
                onChange={handleChange}
                page={38}
            />
        </>
    );

    const renderPhysicalHealthSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Physical health considerations</div>
            <TextAreaQuestion
                label="Overview of mobility"
                name="mobilityOverview"
                value={formData.mobilityOverview}
                onChange={handleChange}
                page={40}
            />

            {/* Strength Checkboxes (Multiple selection) */}
            <CheckboxRadioQuestion
                label="Strength"
                name="strength"
                options={['With in normal limits', 'Left sided upper body weakness', 'Left sided lower body weakness', 'Right sided upper body weakness', 'Right sided lower weakness', 'Over all frail/weak']}
                value={formData.strength}
                onChange={handleChange}
                type="checkbox"
                page={41}
            />
            <TextAreaQuestion
                label="What Equipment do you have to support you?"
                name="equipmentInfo"
                value={formData.equipmentInfo}
                onChange={handleChange}
                page={42}
            />
            <TextAreaQuestion
                label="Any additional information"
                name="additionalCareInfo" // Reusing this for the text area at the end of the section
                value={formData.additionalCareInfo}
                onChange={handleChange}
                page={39}
            />
        </>
    );

    const renderNutritionSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Nutrition and Hydration</div>
            <TextAreaQuestion
                label="Do you have specific dietary requirements?"
                name="dietaryRequirements"
                value={formData.dietaryRequirements}
                onChange={handleChange}
                page={46}
            />
            {/* SALT Team (Yes/No radio) */}
            <CheckboxRadioQuestion
                label="Are you currently under the SALT team?"
                name="saltTeamInvolvement"
                options={['Yes', 'No']}
                value={formData.saltTeamInvolvement === true ? 'Yes' : formData.saltTeamInvolvement === false ? 'No' : null}
                onChange={(e) => handleSingleSelectChange('saltTeamInvolvement', e.target.value === 'Yes' ? true : false)}
                type="radio"
                page={47}
            />
            <TextAreaQuestion
                label="If yes, please provide additional information?"
                name="saltAdditionalInfo"
                value={formData.saltAdditionalInfo}
                onChange={handleChange}
                page={48}
            />
            {/* Meal Preparer (Radio Group) */}
            <CheckboxRadioQuestion
                label="Who prepares your meals?"
                name="mealPreparer"
                options={['Family/Friends', 'Independently', 'Carers']}
                value={formData.mealPreparer}
                onChange={(e) => handleSingleSelectChange('mealPreparer', e.target.value as FormData['mealPreparer'])}
                type="radio"
                page={49}
            />
        </>
    );

    const renderDomesticSupportSection = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Domestic support</div>
            <TextAreaQuestion
                label="What domestic tasks can we help you with around your home? e.g. laundry, dishes etc."
                name="domesticTasks"
                value={formData.domesticTasks}
                onChange={handleChange}
                page={54}
            />
            {/* Food Shopping Support (Radio Group) */}
            <CheckboxRadioQuestion
                label="Who supports you with your food shopping?"
                name="foodShoppingSupport"
                options={['Carers', 'Independent', 'Family/Friends']}
                value={formData.foodShoppingSupport}
                onChange={(e) => handleSingleSelectChange('foodShoppingSupport', e.target.value as FormData['foodShoppingSupport'])}
                type="radio"
                page={55}
            />
            <TextAreaQuestion
                label="Who do you live with?"
                name="whoDoYouLiveWith"
                value={formData.whoDoYouLiveWith}
                onChange={handleChange}
                page={56}
            />
            <TextAreaQuestion
                label="How can we gain access to your property?"
                name="propertyAccess"
                value={formData.propertyAccess}
                onChange={handleChange}
                page={57}
            />
        </>
    );

    const renderCarePackageDetails = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Care Package Details</div>
            <TextAreaQuestion
                label="Number of visits per day"
                name="visitsPerDay"
                value={formData.visitsPerDay}
                onChange={handleChange}
                page={62}
            />
            <TextAreaQuestion
                label="Timing preferences"
                name="timingPreferences"
                value={formData.timingPreferences}
                onChange={handleChange}
                page={63}
            />
            {/* Single/Double Cover (Radio) */}
            <CheckboxRadioQuestion
                label="Do you require single/double cover?"
                name="singleDoubleCover"
                options={['Single', 'Double']}
                value={formData.singleDoubleCover}
                onChange={(e) => handleSingleSelectChange('singleDoubleCover', e.target.value as FormData['singleDoubleCover'])}
                type="radio"
                page={64}
            />
            <TextAreaQuestion
                label="Gender preferences for carers"
                name="genderPreferences"
                value={formData.genderPreferences}
                onChange={handleChange}
                page={65}
            />
        </>
    );

    const renderPersonalBackground = () => (
        <>
            <div className="p-4 bg-blue-600 text-white font-semibold text-lg rounded-t-lg mb-4">Personal Background</div>
            <TextAreaQuestion
                label="Tell us a bit about your family"
                name="familyInfo"
                value={formData.familyInfo}
                onChange={handleChange}
                page={67}
            />
            <TextAreaQuestion
                label="Tell us a bit about your hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                page={68}
            />
            <TextAreaQuestion
                label="What do/did you work as?"
                name="workHistory"
                value={formData.workHistory}
                onChange={handleChange}
                page={69}
            />
            <TextAreaQuestion
                label="What are your likes?"
                name="likes"
                value={formData.likes}
                onChange={handleChange}
                page={70}
            />
            <TextAreaQuestion
                label="Any additional information the care team should know"
                name="additionalCareInfo" // Reusing this for the specific question on page 71
                value={formData.additionalCareInfo}
                onChange={handleChange}
                page={71}
            />
        </>
    );

    const renderFinalFields = () => (
        <>
            <TextAreaQuestion
                label="Form completed by"
                name="formCompletedBy"
                value={formData.formCompletedBy}
                onChange={handleChange}
                page={73}
            />
            <TextAreaQuestion
                label="Date"
                name="dateCompleted"
                value={formData.dateCompleted}
                onChange={handleChange}
                page={74}
            />
        </>
    );

    const handleSubmit = (action: string) => (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Action: ${action}`, formData);
        alert(`Form action: ${action} - Data logged to console.`);
        // Add API calls here based on 'action'
    };

    const navigate = useNavigate();

    return (
        <form className="bg-gray-50 min-h-screen font-sans">
            {/* --- Top Header Section --- */}
            <div className="bg-blue-800 text-white p-4 rounded-t-lg mb-4">
                <h1 className="text-xl font-bold">Initial Care Assessment</h1>
                <p className="text-sm">Client: Charles O'CONNOR</p>
                <p className="text-sm mb-2">Completed By: Bhushan Mehra</p>
                <button onClick={() => {
                    navigate("/customer/plans/start-plan/1")
                }} className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-1 rounded">
                    Back
                </button>
            </div>

            {/* Render all sections based on the images */}
            {renderGeneralInformationSection()}
            {renderHealthSection()}
            {renderPersonalCareSection()}
            {renderPhysicalHealthSection()}
            {renderNutritionSection()}
            {renderDomesticSupportSection()}
            {renderCarePackageDetails()}
            {renderPersonalBackground()}
            {renderFinalFields()}

            {/* --- Final Button Bar (Sticky Footer Style) --- */}
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 shadow-xl flex justify-end space-x-3 mt-8">
                <button
                    onClick={handleSubmit('Save & Close Form')}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                    Save & Close Form
                </button>
                <button
                    onClick={handleSubmit('Save & Lock Form')}
                    className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition"
                >
                    Save & Lock Form
                </button>
                <button
                    onClick={handleSubmit('Save & Exit (Complete Form Later)')}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                >
                    Save & Exit (Complete Form Later)
                </button>
            </div>
        </form>
    );
};

export default ComprehensiveCareForm;