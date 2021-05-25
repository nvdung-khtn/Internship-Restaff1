namespace eCommerce.Domain.Seedwork
{
    public enum ConcurrencyResolutionStrategy
    {
        /// <summary>
        /// Throws exception
        /// </summary>
        None,

        /// <summary>
        /// Uses database values
        /// </summary>
        DatabaseWin,

        /// <summary>
        /// Uses client values
        /// </summary>
        ClientWin
    }
}
