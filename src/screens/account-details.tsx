import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { TextInput } from "../design-system/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setAccountDetails } from "../store/account/slice";
import { accountSelectors } from "../store/account/selectors";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { Checkbox } from "../design-system/Checkbox";
import { CardActions } from "../design-system/CardActions";
import { TextButton } from "../design-system/TextButton";

interface FormInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  hasAgreedToTerms: boolean;
  hasAgreedToMarketing: boolean;
}

export function AccountDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector(accountSelectors.getAccount);
  const patient = useSelector(accountSelectors.getPatient);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormInput>({
    defaultValues: {
      email: account.email,
      password: account.password,
      firstName: account.firstName,
      lastName: account.lastName,
      hasAgreedToTerms: account.hasAgreedToTerms,
      hasAgreedToMarketing: account.hasAgreedToMarketing,
    },
  });

  const onSubmit = handleSubmit((data: FormInput) => {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setAccountDetails(data));
      setIsSubmitting(false);
      history.push("/verify-email");
    }, 300);
  });

  return (
    <>
      <PageContents maxWidth={560}>
        <Card as="form" onSubmit={onSubmit}>
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              {patient.isNoK ? "Tell us about yourself" : "Create your account"}
            </Heading>
            <Text>
              {patient.isNoK
                ? "First we’ll get your account set up. Then we’ll ask for some details about the person you care for."
                : "To get started, enter your email address and create a password."}
            </Text>
          </List>
          {patient.isNoK ? (
            <>
              <TextInput
                name="firstName"
                label="Your first name"
                validationMessage={errors.firstName && errors.firstName.message}
                ref={register({ required: "Please enter your first name" })}
              />
              <TextInput
                name="lastName"
                label="Your last name"
                validationMessage={errors.lastName && errors.lastName.message}
                ref={register({ required: "Please enter your last name" })}
              />
            </>
          ) : null}
          <TextInput
            type="email"
            name="email"
            label={patient.isNoK ? "Your email address" : "Email address"}
            validationMessage={errors.email && errors.email.message}
            ref={register({ required: "Please enter an email address" })}
          />
          <TextInput
            type="password"
            name="password"
            label={patient.isNoK ? "Create a password" : "Password"}
            helpMessage="Your password must be at least 6 characters long"
            validationMessage={errors.password && errors.password.message}
            ref={register({
              required:
                "Please enter a password that is at least 6 characters long",
              minLength: {
                value: 6,
                message:
                  "Please enter a password that is at least 6 characters long",
              },
            })}
          />
          <Divider />
          <Checkbox
            name="hasAgreedToTerms"
            labelText="I agree to Echo’s terms and conditions and privacy policy."
            ref={register({
              required:
                "You must agree to Echo's terms and conditions and privacy policy",
            })}
            helpMessage={
              <>
                Read the{" "}
                <TextButton
                  size={1}
                  onClick={() => history.push("/terms-conditions")}
                >
                  terms and conditions
                </TextButton>{" "}
                and{" "}
                <TextButton
                  size={1}
                  onClick={() => history.push("/privacy-policy")}
                >
                  privacy policy
                </TextButton>
                .
              </>
            }
            validationMessage={
              errors.hasAgreedToTerms && errors.hasAgreedToTerms.message
            }
          />
          <Checkbox
            name="hasAgreedToMarketing"
            labelText="Send me emails about Echo’s products, events, and news."
            ref={register}
          />
          <Divider />
          <CardActions>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <Button shouldSubmit={true} isLoading={isSubmitting}>
              Continue
            </Button>
          </CardActions>
        </Card>
      </PageContents>
    </>
  );
}
