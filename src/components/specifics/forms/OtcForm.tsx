import { GotchiFieldsFragment } from "@/graphql/core/__generated__/graphql";
import { Formik, Field, Form, FormikHelpers } from "formik";

type OtcFormProps = {
  selectedAsset: GotchiFieldsFragment | null;
};

type OtcFormValues = {
  price: number;
  address: string;
};

export const OtcForm = (props: OtcFormProps) => {
  return (
    <>
      <Formik
        initialValues={{
          price: 0,
          address: "",
        }}
        onSubmit={(
          values: OtcFormValues,
          { setSubmitting }: FormikHelpers<OtcFormValues>
        ) => {}}
      >
        <Form>
          <div className="flex flex-col lg:flex-row justify-center place-items-center gap-y-2 lg:gap-x-10 leading-8">
            <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
              <label htmlFor="address">Address</label>
              <Field
                id="address"
                name="address"
                type="text"
                size="42"
                maxlength="42"
                className="text-purple-950 pl-1"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-5">
              <label htmlFor="price">Price (GHST)</label>
              <Field
                id="price"
                name="price"
                type="number"
                className="text-purple-950 pl-1"
              />
            </div>
            <div>
              <button className="bg-purple-800 hover:bg-gotchi-500 px-8" type="submit">Create Otc</button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
