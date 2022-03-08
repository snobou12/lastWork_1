import { Registration } from "../components/Registration";
import { BiggerRegistration } from "../components/BiggerRegistration";
import { RegistrationError } from "../components/RegistrationError";
import { RegistrationRefusal } from "../components/RegistrationRefusal";
import { RegistrationExistingAccount } from "../components/RegistrationExistingAccount";
import { RegistrationNumberConfirmation } from "../components/RegistrationNumberConfirmation";
import { RegistrationNumberConfirmationLoading } from "../components/RegistrationNumberConfirmationLoading";
import { RegistrationNumberConfirmationError } from "../components/RegistrationNumberConfirmationError";
import { RegistrationTimer } from "../components/RegistrationTimer";
import { RegistrationEmail } from "../components/RegistrationEmail";
import { Authorization } from "../components/Authorization";
import { AuthorizationNumberConfirm } from "../components/AuthorizationNumberConfirm";
import { AuthorizationNumberConfirmError } from "../components/AuthorizationNumberConfirmError";
import { AuthorizationBlockingCounter } from "../components/AuthorizationBlockingCounter";
import { ChangeNumberStepOne } from "../components/ChangeNumber/ChangeNumberStepOne";
import { ChangeNumberError } from "../components/ChangeNumber/ChangeNumberError";
import { ChoosingResetMethod } from "../components/ChangeNumber/ChoosingResetMethod";
import { ChangeNumberCodeword } from "../components/ChangeNumber/ChangeNumberCodeword";
import { ChangeNumberCodewordError } from "../components/ChangeNumber/ChangeNumberCodewordError";
import { ChangeNumberReviewNotice } from "../components/ChangeNumberReviewNotice";
import { ChangeNumberUploadingPhotoDocs } from "../components/ChangeNumberUploadingPhotoDocs";
import { NewApplicationPassport } from "../components/NewApplicationPassport";
import { NewApplicationAddress } from "../components/NewApplicationAddress";
import { NewApplicationNoAddress } from "../components/NewApplicationNoAddress";
import { NewApplicationPlaceWork } from "../components/NewApplicationPlaceWork";
import { NewApplicationAdditionalQuestions } from "../components/NewApplicationAdditionalQuestions";
import { NewApplicationAdditionalQuestionsExpanded } from "../components/NewApplicationAdditionalQuestionsExpanded";
import { NewApplicationNumberConfirm } from "../components/NewApplicationNumberConfirm";
import { NewApplicationSelectMap } from "../components/NewApplicationSelectMap";
import { NewApplicationDocsUploading } from "../components/NewApplicationDocsUploading";
import { NewApplicationSigning } from "../components/NewApplicationSigning";
import ReapplicationConfirmation from '../components/ReapplicationConfirmation/index';
import ReapplicationMethodObtaining from '../components/ReapplicationMethodObtaining/index';
import {NewApplicationTimer} from "../components/NewApplicationTimer";
import {ReapplicationNumberConfirm} from "../components/ReapplicationNumberConfirm";
import {ReapplicationSigning} from "../components/ReapplicationSigning";
import {ReapplicationDocsUploading} from "../components/ReapplicationDocsUploading";
import {Offer} from "../components/Offer/Offer";


export const routes = [{
        path: '/registration',
        exact: true,
        component: Registration,
        title: "Register",
        id: 0
    },
    {
        path: '/registration-expanded-list',
        exact: true,
        component: BiggerRegistration,
        title: "Bigger Register",
        id: 1
    },
    {
        path: '/registration-error',
        exact: true,
        component: RegistrationError,
        title: "Register error",
        id: 2
    },
    {
        path: '/registration-refusal',
        exact: true,
        component: RegistrationRefusal,
        title: "Register refusal",
        id: 3
    },
    {
        path: '/registration-existing-account-notification',
        exact: true,
        component: RegistrationExistingAccount,
        title: "Register existing",
        id: 4
    },
    {
        path: '/registration-number-confirmation',
        exact: true,
        component: RegistrationNumberConfirmation,
        title: "Register confirmation",
        id: 5
    },
    {
        path: '/registration-number-confirmation-loading',
        exact: true,
        component: RegistrationNumberConfirmationLoading,
        title: "Register confirmation loading",
        id: 6
    },
    {
        path: '/registration-number-confirmation-error',
        exact: true,
        component: RegistrationNumberConfirmationError,
        title: "Register confirmation error",
        id: 7
    },
    {
        path: '/registration-timer',
        exact: true,
        component: RegistrationTimer,
        title: "Register confirmation timer",
        id: 8
    },
    {
        path: '/registration-email-confirmation',
        exact: true,
        component: RegistrationEmail,
        title: "Register confirmation email",
        id: 9
    },
    {
        path: '/authorization',
        exact: true,
        component: Authorization,
        title: "Authorization",
        id: 10
    },
    {
        path: '/authorization-number-confirmation',
        exact: true,
        component: AuthorizationNumberConfirm,
        title: "Authorization number confirmation",
        id: 11
    },
    {
        path: '/authorization-number-confirmation-error',
        exact: true,
        component: AuthorizationNumberConfirmError,
        title: "Authorization number confirmation error",
        id: 12
    },
    {
        path: '/authorization-blocking-counter',
        exact: true,
        component: AuthorizationBlockingCounter,
        title: "Authorization blocking counter",
        id: 13
    },
    {
        path: '/change-number-step-1',
        exact: true,
        component: ChangeNumberStepOne,
        title: "Change number step 1",
        id: 14
    },
    {
        path: '/change-number-step-1-error',
        exact: true,
        component: ChangeNumberError,
        title: "Change number step 1 error",
        id: 15
    },
    {
        path: '/choosing-reset-method',
        exact: true,
        component: ChoosingResetMethod,
        title: "Choosing reset method",
        id: 16
    },
    {
        path: '/change-number-сodeword',
        exact: true,
        component: ChangeNumberCodeword,
        title: "Change number сodeword",
        id: 17
    },
    {
        path: '/change-number-сodeword-error',
        exact: true,
        component: ChangeNumberCodewordError,
        title: "Change number сodeword error",
        id: 18
    },
    {
        path: '/change-number-review-notice',
        exact: true,
        component: ChangeNumberReviewNotice,
        title: "Change number review notice",
        id: 19
    },
    {
        path: '/change-number-uploading_photo_documents',
        exact: true,
        component: ChangeNumberUploadingPhotoDocs,
        title: "Change number upload photo docs",
        id: 20
    },
    {
        path: '/new_application-passport',
        exact: true,
        component: NewApplicationPassport,
        title: "New Application Passport",
        id: 21
    },
    {
        path: '/new_application-address',
        exact: true,
        component: NewApplicationAddress,
        title: "New Application Address",
        id: 22
    },
    {
        path: '/new_application-no-address',
        exact: true,
        component: NewApplicationNoAddress,
        title: "New Application No Address",
        id: 23
    },
    {
        path: '/new_application-place-work',
        exact: true,
        component: NewApplicationPlaceWork,
        title: "New Application Place Work",
        id: 24
    },
    {
        path: '/new_application-additional-questions',
        exact: true,
        component: NewApplicationAdditionalQuestions,
        title: "New Application Additional Questions",
        id: 26
    },
    {
        path: '/new_application-additional-questions-expanded',
        exact: true,
        component: NewApplicationAdditionalQuestionsExpanded,
        title: "New Application Additional Questions Expanded",
        id: 27
    },
    {
        path: '/new_application-number-confirmation',
        exact: true,
        component: NewApplicationNumberConfirm,
        title: "New Application Additional Number Confirm",
        id: 28
    },
    {
        path: '/new_application-select-map',
        exact: true,
        component: NewApplicationSelectMap,
        title: "New Application Additional Select Map",
        id: 29
    },
    {
        path: '/new_application-docs-uploading',
        exact: true,
        component: NewApplicationDocsUploading,
        title: "New Application Docs Uploading",
        id: 30
    },
    {
        path: '/new_application-signing',
        exact: true,
        component: NewApplicationSigning,
        title: "New Application Signing",
        id: 31

    },
    {
        path: "/reapplication-confirmation",
        exact: true,
        component: ReapplicationConfirmation,
        title: "Reapplication Confirmation",
        id: 32,
    },
    {
        path: "/reapplication-number-confirmation",
        exact: true,
        component: ReapplicationNumberConfirm,
        title: "Reapplication Number Confirmation",
        id: 33,
    },
    {
        path: "/reapplication-method-obtaining",
        exact: true,
        component: ReapplicationMethodObtaining,
        title: "Reapplication Method Obtaining",
        id: 34,
    },
    {
        path: "/reapplication-docs-uploading",
        exact: true,
        component: ReapplicationDocsUploading,
        title: "Reapplication Documents Uploading",
        id: 35,
    },
    {
        path: "/reapplication-signing",
        exact: true,
        component: ReapplicationSigning,
        title: "Reapplication Signing",
        id: 36,
    },
    {
        path: '/new_application-timer',
        exact: true,
        component: NewApplicationTimer,
        title: "New Application Timer",
        id: 37
    },
    {
        path: '/offer',
        exact: true,
        component: Offer,
        title: "Offer",
        id: 38
    },
]
