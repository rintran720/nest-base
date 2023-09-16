import { HttpCode, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const CreateRoleDecorator = () => {
  return applyDecorators(
    HttpCode(200),
    ApiOperation({
      summary: 'This API is used to crete new role',
    }),
    ApiParam({
      name: 'id',
      required: true,
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: Object,
    }),
  );
};
