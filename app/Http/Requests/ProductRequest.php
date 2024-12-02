<?php

namespace App\Http\Requests;

use App\Exceptions\ValidationException;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return  [
            'name' => ['required', 'string', 'max:120'],
            'sku' => ['required', 'string', 'max:120', Rule::unique('products')->ignore($this->route('product'))], // Ignore SKU uniqueness if it's the same product being updated
            'quantity' => ['required', 'numeric', 'min:1'],
            'price' => ['required', 'numeric', 'min:1'],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    /**
     * Throw a validation exception
     *
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator);
    }
}
