import { useStrategyActions } from "@/hooks/useStrategyActions";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";

export const StrategyForm: React.FC = () => {
  const { createStrategy, updateStrategy } = useStrategyActions();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData: any) => {
    if (formData.id) {
      await updateStrategy(formData);
    } else {
      await createStrategy(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="Strategy Name"
        inputRef={register({ required: true })}
        error={!!errors.name}
        helperText={errors.name ? "Strategy name is required" : ""}
      />
      <TextField
        name="description"
        label="Description"
        inputRef={register}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};