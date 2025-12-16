/**
 * Get User Results Use Case
 * Retrieves test results history for a user
 */
class GetUserResultsUseCase {
  constructor(resultRepository) {
    this.resultRepository = resultRepository;
  }

  async execute(userId) {
    try {
      const results = await this.resultRepository.getResultsByUserId(userId);
      return {
        success: true,
        results: results.map((result) => result.toJSON()),
        total: results.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = GetUserResultsUseCase;
