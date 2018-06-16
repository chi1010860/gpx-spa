using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Winpc32
{
    public class DllInvoke
    {
        [DllImport(@"D:\Programs\VueProject\gpx-spa\HALNodeServer\MemAPI32S.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Auto, SetLastError = true)]
        public static extern bool NETInitializeVRAM();

        [DllImport(@"D:\Programs\VueProject\gpx-spa\HALNodeServer\MemAPI32S.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Auto, SetLastError = true)]
        public extern static bool NETCloseVRAM();

        [DllImport(@"D:\Programs\VueProject\gpx-spa\HALNodeServer\MemAPI32S.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Auto, SetLastError = true)]
        public extern static UInt32 NETSetBit(byte type, UInt32 offset, UInt32 value);

        [DllImport(@"D:\Programs\VueProject\gpx-spa\HALNodeServer\MemAPI32S.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Auto, SetLastError = true)]
        public extern static UInt32 NETGetBit(byte type, UInt32 offset);

        public UInt32 GDEGetBit(byte type, UInt32 offset)
        {
            return NETGetBit(type, offset);
        }

        public UInt32 GDESetBit(byte type, UInt32 offset, UInt32 value)
        {
            return NETSetBit(type, offset, value);
        }

        public void InitializeVRAM()
        {
            NETInitializeVRAM();
        }

        public DllInvoke()
        {

        }

        ~DllInvoke()
        {

        }

    }

    public static class Helper
    {
        private static DllInvoke dll = new DllInvoke();

        public static void MyInitial()
        {
            dll.InitializeVRAM();
        }

        public static UInt32 MyGetBit(UInt32 nAddress)
        {
            return dll.GDEGetBit(48, nAddress);
        }

        public static UInt32 MySetBit(UInt32 nAddress, UInt32 nValue)
        {
            return dll.GDESetBit(48, nAddress, nValue);
        }
    }

    public class Startup
    {
        public async Task<object> MyInitial(dynamic input)
        {
            try
            {
                Helper.MyInitial();
                return "WINPC32 has been initialized.";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + "," + ex.StackTrace);
                return null;
            }
        }

        public async Task<object> MyGetBit(dynamic input)
        {
            try
            {
                UInt32 anAddress = (uint)input.address;
                return Helper.MyGetBit(anAddress);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + "," + ex.StackTrace);
                return null;
            }
        }

        public async Task<object> MySetBit(dynamic input)
        {
            try
            {
                UInt32 anAddress = (uint)input.address;
                UInt32 aValue = (uint)input.value;
                return Helper.MySetBit(anAddress, aValue);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + "," + ex.StackTrace);
                return null;
            }
        }
    }
}
