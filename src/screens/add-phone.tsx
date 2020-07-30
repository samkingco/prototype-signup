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
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";

interface FormInput {
  phone: string;
}

export function AddPhone() {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector(accountSelectors.getAccount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormInput>({
    defaultValues: {
      phone: account.phone,
    },
  });

  const onSubmit = handleSubmit((data: FormInput) => {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setAccountDetails(data));
      setIsSubmitting(false);
      history.push("/verify-phone");
    }, 350);
  });

  return (
    <>
      <PageContents maxWidth={560}>
        <Card as="form" onSubmit={onSubmit}>
          <ProgressSteps currentStep={2} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Add your phone number
            </Heading>
            <Text>
              We use your phone number to make your account more secure. It
              helps us confirm that it’s really you logging in to your account.
            </Text>
          </List>
          <TextInput
            type="tel"
            name="phone"
            label="Phone number"
            validationMessage={errors.phone && errors.phone.message}
            ref={register({ required: "Please enter your phone number" })}
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
