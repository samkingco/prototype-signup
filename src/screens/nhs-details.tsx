import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { format, parse } from "date-fns";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { TextInput } from "../design-system/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setPatientDetails } from "../store/account/slice";
import { accountSelectors } from "../store/account/selectors";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { PatientGender } from "../store/account/fake-data";
import { SelectInput } from "../design-system/SelectInput";
import { MaskedInput } from "../design-system/MaskedInput";
import { ProgressSteps } from "../components/ProgressSteps";
import { LoadingIndicator } from "../design-system/LoadingIndicator";
import { CardActions } from "../design-system/CardActions";

interface FormInput {
  nhsNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  postcode: string;
}

export function NHSDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector(accountSelectors.getPatient);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const genderOptions: { label: string; value: PatientGender }[] = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "Non-binary/third gender", value: "Non-binary" },
    { label: "Prefer not to say", value: "None" },
  ];

  const { register, handleSubmit, errors, control } = useForm<FormInput>({
    defaultValues: {
      nhsNumber: patient.nhsNumber,
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: `${patient.gender || ""}`,
      dateOfBirth: patient.dateOfBirth
        ? format(patient.dateOfBirth, "dd/MM/yyyy")
        : "",
      postcode: patient.postcode,
    },
  });

  const onSubmit = handleSubmit((data: FormInput) => {
    setIsLookingUp(true);

    setTimeout(() => {
      dispatch(
        setPatientDetails({
          ...data,
          dateOfBirth: parse(
            data.dateOfBirth,
            "dd/MM/yyyy",
            new Date()
          ).getTime(),
          gender: data.gender as PatientGender,
        })
      );
      history.push("/confirm-gp");
    }, 2000);
  });

  return (
    <>
      <PageContents maxWidth={560}>
        {isLookingUp ? (
          <Card justify="center">
            <Heading size={4} fontFamily="display">
              Searching the NHS system
            </Heading>
            <LoadingIndicator size={5} />
          </Card>
        ) : (
          <Card as="form" onSubmit={onSubmit}>
            <ProgressSteps currentStep={3} />
            <Divider />
            <List gap={3}>
              <Heading size={4} fontFamily="display">
                Enter {patient.isNoK ? "their" : "your"} details
              </Heading>
              <Text>
                Make sure these match what {patient.isNoK ? "their" : "your"} GP
                has on record for {patient.isNoK ? "them" : "you"}.
              </Text>
            </List>
            {patient.knowsNHSNumber ? (
              <>
                <TextInput
                  name="nhsNumber"
                  label="NHS number"
                  placeholder="e.g. 485 777 3456"
                  validationMessage={
                    errors.nhsNumber && errors.nhsNumber.message
                  }
                  ref={register({
                    required: `Please enter ${
                      patient.isNoK ? "their" : "your"
                    } NHS number`,
                  })}
                />
                <Controller
                  as={MaskedInput}
                  control={control}
                  name="dateOfBirth"
                  label="Date of birth"
                  placeholder="DD/MM/YYYY"
                  placeholderChar="-"
                  mask="11/11/1111"
                />
              </>
            ) : (
              <>
                <TextInput
                  name="firstName"
                  label="First name"
                  helpMessage="Do not include middle names."
                  validationMessage={
                    errors.firstName && errors.firstName.message
                  }
                  ref={register({
                    required: `Please enter ${
                      patient.isNoK ? "their" : "your"
                    } first name`,
                  })}
                />
                <TextInput
                  name="lastName"
                  label="Last name"
                  validationMessage={errors.lastName && errors.lastName.message}
                  ref={register({
                    required: `Please enter ${
                      patient.isNoK ? "their" : "your"
                    } last name`,
                  })}
                />
                <Controller
                  control={control}
                  name="gender"
                  render={({ onChange, value }) => (
                    <SelectInput
                      name="gender"
                      label="Gender"
                      value={value}
                      onChange={onChange}
                    >
                      <option value="" disabled={true} hidden={true}>
                        Choose an option
                      </option>
                      {genderOptions.map((i) => (
                        <option key={i.value} value={i.value}>
                          {i.label}
                        </option>
                      ))}
                    </SelectInput>
                  )}
                />
                <Controller
                  as={MaskedInput}
                  control={control}
                  name="dateOfBirth"
                  label="Date of birth"
                  placeholder="DD/MM/YYYY"
                  placeholderChar="-"
                  mask="11/11/1111"
                />
                <TextInput
                  name="postcode"
                  label="Postcode"
                  validationMessage={errors.postcode && errors.postcode.message}
                  ref={register({
                    required: `Please enter ${
                      patient.isNoK ? "their" : "your"
                    } postcode`,
                  })}
                />
              </>
            )}
            <Divider />
            <CardActions>
              <Button variant="secondary" onClick={() => history.goBack()}>
                Go back
              </Button>
              <Button shouldSubmit={true} isLoading={isLookingUp}>
                Continue
              </Button>
            </CardActions>
          </Card>
        )}
      </PageContents>
    </>
  );
}
